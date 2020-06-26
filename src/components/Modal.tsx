import React, { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { Getter } from "../scripts/dataApi";

const dataApi = new Getter();

const useStyles = makeStyles({
  fab: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
  },
  dialog: {
    width: "100%",
  },
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    width: "350px",
    flex: 1,
    alignContent: "center",
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Modal(props: any) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState("-1");
  const [genres, setGenres] = React.useState(<div></div>);

  const handleGenreChange = (event: any) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRoll = () => {
    if (selected != "-1") {
      dataApi.getGenreId(selected).then((data) => {
        let list = data.results;

        props.onRoll(
          list[Math.floor(Math.random() * list.length)].id as String
        );
      });
    }
  };
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      dataApi.getGenres().then((data: any) => {
        setGenres(
          <div onChange={handleGenreChange}>
            {data.genres.map((el: any) => {
              return (
                <div>
                  <input type="radio" value={el.id} name="gender" />
                  {"  " + el.name}
                </div>
              );
            })}
          </div>
        );
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div onClick={handleClickOpen}>
        <Fab color="primary" aria-label="random" className={classes.fab}>
          <ShuffleIcon />
        </Fab>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title" onClose={handleClose}>
          Movie Roulette
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
            Select Genre
          </Typography>

          {genres}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleRoll} color="primary">
            Roll
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
