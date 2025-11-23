import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TestPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const start = performance.now();

        const res = await fetch(
          `https://china-proxy.optomall.uz?url=${encodeURIComponent(
            `http://api.tmapi.top/1688/v2/item_detail?item_id=${id}&apiToken=${process.env.NEXT_PUBLIC_TMAPI_TOKEN}`
          )}`
        );

        const end = performance.now();
        setTime(end - start);

        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ padding: 30, fontFamily: "monospace" }}>
      <h1>China API Test</h1>
      <p>
        <strong>Item ID:</strong> {id}
      </p>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {time && (
        <p>
          <strong>Load time:</strong> {time.toFixed(2)} ms
        </p>
      )}
      {data && (
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: 15,
            borderRadius: 8,
            fontSize: 13,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestPage;
