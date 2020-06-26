import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import FadeIn from "react-fade-in";

const useStyles = makeStyles({
  root: {
    width: "300px",
  },
  container: { margin: "40px" },
  badgeText: { fontSize: "15px" },
  title: { height: "75px" },
});

export default function ImgMediaCard(props: {
  rating: string;
  title: string;
  img: string;
  lang: string;
  onclick: Function;
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Badge
        className={classes.root}
        badgeContent={<span className={classes.badgeText}>{props.rating}</span>}
        color="primary"
      >
        <Card className={classes.root} onClick={() => props.onclick()}>
          <CardActionArea>
            <FadeIn transitionDuration={600}>
              <div>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={`https://image.tmdb.org/t/p/w500/${props.img}`}
                  title="Contemplative Reptile"
                />
              </div>
            </FadeIn>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.title}
              >
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Language: {props.lang}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Badge>
    </div>
  );
}
