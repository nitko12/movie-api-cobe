import React, { useEffect, useState } from "react";
import FilmCard from "./components/FilmCard";

import { Getter } from "./scripts/dataApi";
import { makeStyles } from "@material-ui/core/styles";
import GlobalNavbar from "./components/GlobalNavbar";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";
import Modal from "./components/Modal";

const dataApi = new Getter();

const useStyles = makeStyles({
  App: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  cardWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "20px",
  },
  loadingButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBlockEnd: "30px",
  },
});

function App(props: any) {
  const classes = useStyles();
  const [data, setData] = useState(new Array());

  useEffect(() => {
    const fetchData = async () => {
      dataApi.getPopular().then((data: any) => {
        setData(data.results);
      });
    };
    fetchData();
  }, []);

  const loadMore = () => {
    dataApi.getPopular().then((newData: { results: Array<any> }) => {
      setData([...data, ...newData.results]);
    });
  };

  return (
    <div className="App">
      <GlobalNavbar />
      <div className={classes.cardWrapper}>
        {data.map((item: any) => (
          <div>
            <FilmCard
              onclick={() => {
                props.history.push(`/info/${item.id}`);
              }}
              rating={item.vote_average}
              title={item.title}
              img={item.backdrop_path}
              lang={item.original_language}
            />
          </div>
        ))}
      </div>
      <div className={classes.loadingButtonContainer}>
        <Button variant="contained" onClick={loadMore}>
          Load more
        </Button>
      </div>

      <Modal onRoll={(id: string) => props.history.push(`/info/${id}`)} />
    </div>
  );
}

export default withRouter(App);
