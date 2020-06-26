import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { Getter } from "./scripts/dataApi";
import FadeIn from "react-fade-in";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const dataApi = new Getter();

const useStyles = makeStyles({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    flex: 1,
    width: "95%",
    height: "95%",
    margin: "0 auto",
  },
  media: {
    height: 140,
  },
  desc: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    height: "100%",
  },
  grid: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: "15px",
    height: "100%",
  },
});

function Info(props: any) {
  const classes = useStyles();
  const id = props.match.params.id;

  const [data, setData] = useState({
    backdrop_path: String,
    overview: String,
    original_title: String,
    popularity: Number,
    original_language: String,
    production_companies: [{ name: String }],
  });

  const [value, setValue] = useState<number | null>(2);

  useEffect(() => {
    const fetchData = async () => {
      dataApi.getId(id).then((newData: any) => {
        if (cookies.get("rating"))
          newData.vote_average = parseFloat(cookies.get("rating"));
        setValue(newData.vote_average);
        setData(newData);
      });
    };
    fetchData();
  }, []);

  const rateHandler = (e: any, v: any) => {
    setData((prev) => {
      let newData = prev;
      setValue(v);
      return newData;
    });
    cookies.set("rating", v);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.desc}>
        <FadeIn transitionDuration={1000} delay={300}>
          <div>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="400"
              image={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
              title="image"
            />
          </div>
          <div>
            <CardContent className={classes.desc}>
              <Typography gutterBottom variant="h5" component="h2">
                {data.original_title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.overview}
                <Grid className={classes.grid} container spacing={1}>
                  <Grid container item xs={3} spacing={1}>
                    <Rating
                      name="hover-feedback"
                      value={value}
                      onChange={rateHandler}
                      max={10}
                      precision={0.25}
                    />
                  </Grid>
                  <Grid container item xs={3} spacing={1}>
                    Popularity: {data.popularity}
                  </Grid>
                  <Grid container item xs={3} spacing={1}>
                    Language: {data.original_language}
                  </Grid>
                  <Grid container item xs={3} spacing={1}>
                    Production companies:{" "}
                    {data.production_companies.map((i) => i.name).join(", ")}
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          </div>
        </FadeIn>
      </CardActionArea>
    </Card>
  );
}

export default withRouter(Info);
