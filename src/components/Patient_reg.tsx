import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UsersInterface } from "../models/IUser";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "date-fns";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  })
);
const ALLERGY = [{ title: "ไม่มี" },{ title: "Paracetamol"},{ title: "Ibuprofen"},{ title: "Orphenadrine"}];
const UNDERLYING_DISEASE = [{ title: "ไม่มี" }, { title: "โรคหลอดเลือดหัวใจ" }, { title: "โรคเบาหวาน" }, { title: "โรคความดันโลหิตสูง" }];

function CreateData() {
  const classes = useStyles();
  const [gender, setGender] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  /**CustomizedDatetime */
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  /**CustomizedDatetime */
  const [user, setUser] = React.useState<Partial<UsersInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);


  /**CustomizedSnackbars*/
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof any;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  function submit() {
    setSuccess(true); /**Tty Button SUMMIT */
    /**let data = {
      PATIENT_ID_CARD: user.PATIENT_ID_CARD ?? "",
      PATIENT_FIRSTNAME: user.PATIENT_FIRSTNAME ?? "",
      PATIENT_LASTNAME: user.PATIENT_LASTNAME ?? "",
      PATIENT_WIEGHT: typeof user.PATIENT_WIEGHT =="string" ? parseInt(user.PATIENT_WIEGHT):0,
      PATIENT_HEIGHT: typeof user.PATIENT_HEIGHT =="string" ? parseInt(user.PATIENT_HEIGHT):0,
      PATIENT_GENDER: typeof user.PATIENT_GENDER =="string" ? parseInt(user.PATIENT_GENDER):0,
      PATIENT_BIRTHDATE: selectedDate,
      ALLERGY: user.ALLERGY ?? "",
      UNDERLYING_DISEASE: user.UNDERLYING_DISEASE ?? "",
    };
    const apiUrl = "#";
    const requestOptions = {
      method: "POST",
      headers: {"Conten-Type":"application/json"},
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
    .then((response)=> response.json())
    .then((res) => {
      if (res.data){
        setSuccess(true);
      }else{
        setError(true);
      }
    });*/
  }
  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ลงทะเบียนสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ลงทะเบียนไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper className={classes.paper}>
        <React.Fragment>
          <Typography variant="h6" color="primary" gutterBottom>
            ระบบลงทะเบียนข้อมูลผู้ป่วย
          </Typography>
          <br />
          <Divider />
          <br />
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                id="PATIENT_ID_CARD"
                label="หมายเลขประจำตัวประชาชน"
                fullWidth
                type="Number"
                value={user.PATIENT_ID_CARD}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                disabled
                id="PATIENT_ID"
                label="หมายเลขประจำตัวผู้ป่วย"
                defaultValue="1001"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="PATIENT_FIRSTNAME"
                label="ชื่อ"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="PATIENT_LASTNAME"
                label="นามสกุล"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2} spacing={0}>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel id="gender">เพศ</InputLabel>
                <Select 
                onChange={handleChange}
                label="gender"
                value={gender}
                >
                  <MenuItem value={1}>ชาย</MenuItem>
                  <MenuItem value={2}>หญิง</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="PATIENT_BIRTHDATE"
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
              <p>ประวัติการแพ้ยา</p>
              <Autocomplete
                id="ALLERGY"
                options={ALLERGY}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <p>โรคประจำตัว</p>
              <Autocomplete
                id="UNDERLYING_DISEASE"
                options={UNDERLYING_DISEASE}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="" variant="outlined" />
                )}
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
              onClick={submit}
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              SUBMIT
            </Button>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
export default CreateData;
