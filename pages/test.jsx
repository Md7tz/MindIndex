import React, { useEffect, useState } from 'react';

export default function Test() {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/test', {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json;charSet=UTF-8",
                        "Accept": "application/json, text/plain, */*",
                        "Cache-Control": "no-cache"
                    }
                });
                const data = await res.json();
                console.log(data);
                setData(data);
            } catch (error) { console.log(error) }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Test</h1>
            <p>{data?.msg}</p>
        </div>
    );
}