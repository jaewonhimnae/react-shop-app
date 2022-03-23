import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import {
  locations,
  lengths,
  services,
  environments,
  ratings,
  shapes,
  types,
  enhancementExtensions,
  nailArts,
} from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");

  const [Filters, setFilters] = useState({
    lengths: [],
    locations: [],
    services: [],
    environments: [],
    ratings: [],
    shapes: [],
    types: [],
    enhancementExtensions: [],
    nailArts: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch product datas");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              {" "}
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = lengths;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log("array", array);
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(variables);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        {/* <h2>  Let's Travel Anywhere  <Icon type="rocket" />  </h2> */}
      </div>

      {/* Filter  */}
      <Row gutter = {[16,16]}>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {services} title = "Service"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {locations} title = "Location"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {environments} title = "Environment"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      </Row>

      <Row gutter = {[16,16]}>
      <Col lg={5} xs={10} >
        <CheckBox 
        list = {lengths} title = "Length"
            handleFilters = {filters => handleFilters(filters, "lengths")}
        />
      </Col>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {shapes} title = "Shape"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      <Col lg={5} xs={10}  >
        <RadioBox
        list = {types} title = "Types"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      </Row>
      
      <Row gutter = {[16,16]}>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {enhancementExtensions} title = "Enhancement Extension"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {ratings} title = "Rating"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      <Col lg={5} xs={10} >
        <RadioBox
        list = {nailArts} title = "Nail Art"
          handleFilters = {filters => handleFilters(filters, "locations")}
          />
      </Col>
      </Row>

      {/* Search  */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

// phase1 search box and filter open
