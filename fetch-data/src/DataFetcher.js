import React, { useEffect, useState, useCallback } from "react";

const dataSources = [
  {
    url: "https://jsonplaceholder.typicode.com/posts/7",
    paramater: "title",
    extractor: data => data.title
  },
  {
    url: "https://api.agify.io/?name=bella",
    paramater: "age",
    extractor: data => data.age
  },
  {
    url: "https://api.agify.io/?name=bella",
    paramater: "someParamThatDoesntExist",
    extractor: data => data.birthdate
  },
  {
    url: "https://api.agify.io/?name=bella",
    paramater: "erroneousParam",
    extractor: data => data.erroneousParam.erroneousParam.erroneousParam
  },
  {
    url: "https://api.agify.io/",
    paramater: "brokenurl",
    extractor: data => data.brokenurl.brokenurl.brokenurl
  }
];

const DataFetcher = ({ hideReloadButton = false, refreshPeriod = 10000 }) => {
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const results = await dataSources.map(async (dataSource) => {
      try {
        const res = await fetch(dataSource.url);
        const json = await res.json();
        const data = dataSource.extractor(json) || 'EMPTY';
        return { data: data, paramater: dataSource.paramater }
      } catch (e) {
        return { data: 'ERROR', paramater: dataSource.paramater }
      }
    });
    const res = await Promise.all(results);
    const newParams = res.reduce((prev, curr) => {
      if (!curr || !curr.paramater || !curr.data) return prev;
      return ({
        ...prev,
        [curr.paramater]: curr.data
      });
    }, params);
    setParams(newParams);
    setLoading(false);
  }, [params]);

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, Math.max(1000, refreshPeriod));
  }, []);

  return (
    <div style={{ color: "#85c" }}>
      <div>
        <h4>Title: {params.title}</h4>
        <h4>Age of bella is {params.age}</h4>
        <h4>This param is {params.someParamThatDoesntExist}</h4>
        <h4>ErroneousParam gave {params.erroneousParam}</h4>
        <h4>broken url result {params.brokenurl}</h4>
      </div>
      {!hideReloadButton && (
        <button onClick={fetchData}>Reload</button>
      )}
      {loading && <h4>Loading</h4>}
    </div>
  );
};

export default DataFetcher;
