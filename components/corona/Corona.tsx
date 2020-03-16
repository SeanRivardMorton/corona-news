import React from "react";
import { coronaApi } from "./corona-api.ts";
import { message, Card, Table, Button } from "antd";
import { formatDistance, subDays } from "date-fns";

export const useCorona = () => {
  const [stats, setStats] = React.useState(null);
  const [active, setActive] = React.useState(null);

  React.useEffect(() => {
    const initialise = async () => {
      const localData = JSON.parse(localStorage.getItem("stats"));
      if (localData) {
        setStats(localData);
      }
      if (!stats && !localData) {
        const data = await coronaApi();
        setStats(data);
        localStorage.setItem("stats", JSON.stringify(data));
      }
    };
    initialise();
  }, []);

  const CoronaCounter = () => {
    if (!stats) return <div>loading...</div>;
    const { confirmed, recovered, deaths } = stats;
    const list = { confirmed, recovered, deaths };

    const iter = Object.entries(list).map(i => {
      return i;
    });

    const updateCorona = async (key, url) => {
      setActive(key);
      if (stats[key].length > 1) {
        message.info("data is cached already");
        return null;
      }
      const newData = await coronaApi(url);
      const newStats = { ...stats };
      newStats[key] = newData;
      message.info(`Fetched ${key}`);
      setStats(newStats);
      localStorage.setItem("stats", JSON.stringify(newStats));
    };

    return (
      <>
        <h1>Stats</h1>
        <div style={{ display: "flex" }}>
          {iter.map(([key, val]) => (
            <Card
              style={{ width: 100 }}
              key={key}
              onClick={() => updateCorona(key, val.detail)}
            >
              <div>
                {key}: {val.value}
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  };

  const CoronaGreeting = () => (
    <div>
      <h1>{active || "Corona Virus"} </h1>
    </div>
  );

  const CoronaTable = () => {
    if (!active) {
      return <div>Start exploring the API</div>;
    }

    if (!stats[active].length > 0) {
      return <div>loading</div>;
    }

    const col = () => {
      return [
        {
          title: "Country",
          dataIndex: "countryRegion",
          key: "countryRegion",
          sorter: (a, b) => a.countryRegion > b.countryRegion,
          render: (text, record) => {
            return record.countryRegion || "";
          }
        },
        {
          title: "province",
          dataIndex: "provinceState",
          key: "provinceState",
          sorter: (a, b) => a.provinceState > b.provinceState,
          render: (text, record) => {
            return record.provinceState || "";
          }
        },
        {
          title: "Confirmed",
          dataIndex: "confirmed",
          key: "confirmed",
          sorter: (a, b) => a.confirmed - b.confirmed,
          render: (text, record) => {
            return record.confirmed || "";
          }
        },
        {
          title: "Recovered",
          dataIndex: "recovered",
          key: "recovered",
          sorter: (a, b) => a.recovered - b.recovered,
          render: (text, record) => {
            return record.recovered || "";
          }
        },
        {
          title: "Deaths",
          dataIndex: "deaths",
          key: "deaths",
          sorter: (a, b) => a.deaths - b.deaths,
          render: (text, record) => {
            return record.deaths || "";
          }
        },
        {
          title: "Last Update",
          dataIndex: "lastUpdate",
          key: "lastUpdate",
          sorter: (a, b) => a.lastUpdate - b.lastUpdate,
          render: (text, record) => {
            const lastUpdate = record.lastUpdate;
            const daysAgo = formatDistance(subDays(lastUpdate, 1), new Date());
            return daysAgo || "";
          }
        }
      ];
    };

    return <Table dataSource={stats[active]} columns={col()} />;
  };

  const CoronaUpdateButton = () => {
    const refetch = async () => {
      const data = await coronaApi();
      message.info("Updated!");
      setStats(data);
    };

    return (
      <Button type="primary" onClick={() => refetch()}>
        Update!
      </Button>
    );
  };

  return { CoronaGreeting, CoronaCounter, CoronaTable, CoronaUpdateButton };
};
