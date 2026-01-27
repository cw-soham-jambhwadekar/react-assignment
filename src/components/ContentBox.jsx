import Card from "./Card";
import "../styles/ContentBox.css";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { SORT_TYPE } from "../utils";
import SkeletonCard from "./SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCarData, updatePaginatedCarData } from "../../redux/data/dataActions";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiSolidCarCrash } from "react-icons/bi";

function ContentBox() {
  const fuel = useSelector((state) => state.filters.fuel);
  const budget = useSelector((state) => state.filters.budget);
  const make = useSelector((state) => state.filters.make);
  const city = useSelector((state) => state.filters.city);

  const carData = useSelector((state) => state.data.carData);
  const paginatedCarData = useSelector((state) => state.data.paginatedCarData);
  const dispatch = useDispatch();

  const [sortKey, setSortKey] = useState("BEST_MATCH");
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [sortMakeYear, setSortMakeYear] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const observerRef = useRef(null);
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const isFetchingRef = useRef(false);
  const nextPageUrlRef = useRef(null);

  useEffect(() => {
    nextPageUrlRef.current = nextPageUrl;
  }, [nextPageUrl]);

  useEffect(() => {
    isFetchingRef.current = loading;
  }, [loading]);

  async function getData() {
    try {
      setLoading(true);
      const body = {};

      if (fuel?.length) body.fuel = fuel.join(" ");
      if (budget?.length === 2) body.budget = `${budget[0]}-${budget[1]}`;
      if (make?.length) body.car = make.join(" ");
      if (city) body.city = city;

      const { so, sc } = SORT_TYPE[sortKey];
      body.so = so;
      body.sc = sc;

      const res = await axios.post(`/api/stocks/filters`, body);

      if (sortMakeYear) {
        const firstPage = [...(res.data.stocks || [])].sort(
          (a, b) => (b.makeYear || 0) - (a.makeYear || 0)
        );
        dispatch(updatePaginatedCarData([firstPage]));
        setCurrentPage(0);
      } else {
        dispatch(updateCarData(res.data.stocks || []));
      }

      setNextPageUrl(res.data.nextPageUrl || null);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      scrollToTop();
    }
  }

  const loadMore = async () => {
    if (!nextPageUrlRef.current || isFetchingRef.current || loading) return;

    try {
      isFetchingRef.current = true;
      setLoading(true);

      const res = await axios.get(nextPageUrlRef.current);

      if (sortMakeYear) {
        const arr = [...res.data.stocks].sort(
          (a, b) => b.makeYear - a.makeYear
        );
        dispatch(updatePaginatedCarData([...paginatedCarData, arr]));
      } else {
        dispatch(updateCarData([...carData, ...res.data.stocks]));
      }

      if (res.data.stocks.length == 0) {
        setHide(true);
      } else {
        setHide(false);
      }

      setNextPageUrl(res.data.nextPageUrl || null);
    } catch (err) {
      console.error("Pagination error:", err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      getData();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fuel, budget, sortKey, make, city, sortMakeYear]);

  useEffect(() => {
    if (sortMakeYear || loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          nextPageUrlRef.current &&
          !isFetchingRef.current
        ) {
          loadMore();
        }
      },
      {
        root: scrollRef.current,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    if (bottomRef.current) {
      observerRef.current.observe(bottomRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [sortMakeYear, loading]);

  const handleSortOptions = (e) => {
    const value = e.target.value;
    if (value === "MAKE_YEAR") {
      setSortMakeYear(true);
      return;
    }
    setSortMakeYear(false);
    setSortKey(value);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="content-box">
      <div id="sort-box">
        <div className="sort-bar">
          <label>Sort By: </label>
          <select
            value={sortMakeYear ? "MAKE_YEAR" : sortKey}
            onChange={handleSortOptions}
          >
            <option value="MAKE_YEAR">Make Year</option>
            <option value="BEST_MATCH">Best Match</option>
            <option value="PRICE_LOW_TO_HIGH">Price: Low to High</option>
            <option value="PRICE_HIGH_TO_LOW">Price: High to Low</option>
            <option value="YEAR_NEWEST_TO_OLDEST">Year: Newest First</option>
            <option value="KMS_LOW_TO_HIGH">KMs: Low to High</option>
            <option value="DISTANCE_NEAREST_FIRST">
              Distance: Nearest First
            </option>
          </select>
        </div>
      </div>

      <div id="content-grid" ref={scrollRef}>
        {(sortMakeYear ? paginatedCarData[currentPage] || [] : carData).map(
          (ele, id) => (
            <Card key={`${ele.id || id}`} data={ele} />
          )
        )}

        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {(paginatedCarData.length == 0) && (carData.length == 0) && (
          <div id="not-found">
            <BiSolidCarCrash size={150} />
            <h1>No Cars Found</h1>
          </div>
        )}

        {!sortMakeYear && !loading && nextPageUrl && !hide && (
          <div
            ref={bottomRef}
            style={{ height: "20px", width: "100%", clear: "both" }}
          />
        )}
      </div>

      {sortMakeYear && (
        <div id="page-nav">
          <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}>
            <MdOutlineArrowBackIosNew />
            prev
          </button>
          {currentPage}
          <button
            onClick={() => {
              loadMore();
              setCurrentPage((i) => i + 1);
              scrollToTop();
            }}
          >
            next
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      )}

      {!nextPageUrl && !loading && carData.length > 0 && (
        <p style={{ textAlign: "center", margin: "10px", opacity: 0.6 }}>
          You’ve reached the end 🚗
        </p>
      )}
    </div>
  );
}

export default ContentBox;