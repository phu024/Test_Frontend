import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UsersInterface } from "../models/IUser";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ImageListItem from "@material-ui/core/ImageListItem";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import "date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1 },
    container: { marginTop: theme.spacing(5) },

    paper: { padding: theme.spacing(5), color: theme.palette.text.secondary },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
      marginTop: theme.spacing(5),
      margin: theme.spacing(0),
    },
    media: {
      height: 140,
    },
  })
);

function CreateData() {
  const classes = useStyles();
  const [gender, setGender] = React.useState("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <Container className={classes.container} maxWidth="md">

      <Paper className={classes.paper}>
        <React.Fragment>
          <Typography variant="h6" color="primary" gutterBottom>
            ระบบลงทะเบียนข้อมูลผู้ป่วย
          </Typography>

          
          <Divider />
          <br />
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12}>
              <TextField
                required
                id="patient_id_caad"
                name="patient_id_caad"
                label="หมายเลขประจำตัวประชาชน"
                fullWidth
                type="Number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="ชื่อ"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="นามสกุล"
                fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required
                id="patient_id_caad"
                name="patient_id_caad"
                label="น้ำหนัก"
                fullWidth
                type="Number"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                required
                id="patient_id_caad"
                name="patient_id_caad"
                label="ส่วนสูง"
                fullWidth
                type="Number"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="gender">เพศ</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={gender}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>ชาย</MenuItem>
                  <MenuItem value={2}>หญิง</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="birthdate"
                  label="วัน/เดือน/ปีเกิด"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="patient_id_caad"
                name="patient_id_caad"
                label="ประวัติการแพ้ยา"
                fullWidth
                multiline
                rows={4}
                type="String"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="patient_id_caad"
                name="patient_id_caad"
                label="โรคประจำตัว"
                fullWidth
                multiline
                rows={4}
                type="String"
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>

      <Grid container justifyContent="center">
        <div>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
export default CreateData;
