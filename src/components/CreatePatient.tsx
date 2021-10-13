/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { useEffect, useState } from "react";
//import { Link as RouterLink } from "react-router-dom";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "date-fns";
import SaveIcon from "@material-ui/icons/Save";

import { GenderInterface } from "../models/IGender";
import { AllergyInterface } from "../models/IAllergy";
import { Underlying_diseaseInterface } from "../models/IUnderlying_disease";
import { RecorderInterface } from "../models/IRecorder";
import { PatientInterface } from "../models/IPatient";

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

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function CreatePatient() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [gender, setGenders] = useState<GenderInterface[]>([]);
  const [underlying_disease, setUnderlying_diseases] = useState<Underlying_diseaseInterface[]>([]);
  const [allergy, setAllergys] = useState<AllergyInterface[]>([]);
  const [recorder, setRecorders] = useState<RecorderInterface[]>([]);
  const [patient, setPatient] = useState<Partial<PatientInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof patient;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getDisease = async () => {
    fetch(`${apiUrl}/underlying_diseases`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUnderlying_diseases(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getAllergy = async () => {
    fetch(`${apiUrl}/allergys`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setAllergys(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getRecorder = async () => {
    fetch(`${apiUrl}/recorders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRecorders(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getGender;
    getAllergy;
    getDisease;
    getRecorder;
  },);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    setSuccess(true); /**Tty Button SUMMIT */
    let data = {
      ID_CARD: convertType(patient.ID_CARD),
      FIRSTNAME: convertType(patient.FIRSTNAME),
      LASTNAME: convertType(patient.LASTNAME),
      AGE: convertType(patient.AGE),
      BIRTHDATE: selectedDate,
      AllergyID: convertType(patient.AllergyID),
      Underlying_diseaseID: convertType(patient.Underlying_diseaseID),
      RecorderID: convertType(patient.RecorderID),
    };

    const requestOptionsPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/patients`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
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
                value={patient.ID_CARD}
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
                  native
                  value={patient.GenderID}
                  onChange={handleChange}
                  inputProps={{ name: "VideoID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {gender.map((item: GenderInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.IDENTITY}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
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
              <Select
                  native
                  value={patient.AllergyID}
                  onChange={handleChange}
                  inputProps={{ name: "AllergyID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {allergy.map((item: AllergyInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.INFORMATION}
                    </option>
                  ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
              <p>โรคประจำตัว</p>
              <Select
                  native
                  value={patient.Underlying_diseaseID}
                  onChange={handleChange}
                  inputProps={{ name: "Underlying_diseaseID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {underlying_disease.map((item: Underlying_diseaseInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.INFORMATION}
                    </option>
                  ))}
                </Select>
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
export default CreatePatient;
