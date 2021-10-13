/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { useEffect, useState } from "react";
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
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function CreatePatient() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [underlying_diseases, setUnderlying_diseases] = useState<Underlying_diseaseInterface[]>([]);
  const [allergys, setAllergys] = useState<AllergyInterface[]>([]);
  const [recorders, setRecorders] = useState<RecorderInterface[]>([]);
  const [patients, setPatient] = useState<Partial<PatientInterface>>({});

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
    const name = event.target.name as keyof typeof patients;
    setPatient({
      ...patients,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getGender = async() => {
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
  const getDisease = async() => {
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
  const getAllergy = async() => {
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
  const getRecorder = async() => {
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
  },[]);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    setSuccess(true); /**Tty Button SUMMIT */
    let data = {
      ID_CARD: convertType(patients.ID_CARD),
      FIRSTNAME: convertType(patients.FIRSTNAME),
      LASTNAME: convertType(patients.LASTNAME),
      AGE: convertType(patients.AGE),
      BIRTHDATE: selectedDate,
      AllergyID: convertType(patients.AllergyID),
      Underlying_diseaseID: convertType(patients.Underlying_diseaseID),
      RecorderID: convertType(patients.RecorderID),
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
                value={patients.ID_CARD}
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid item xs={12} sm={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>เพศ</InputLabel>
                <Select
                  label=""
                  value={patients.GenderID}
                  onChange={handleChange}
                  inputProps={{ name: "GenderID" }}
                ><option aria-label="None" value="">
                กรุณาเลือก
              </option>
                  {genders.map((item: GenderInterface) => (
                    
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
            <Grid item xs={12} sm={2}>
            <TextField
                disabled
                id="PATIENT_ID"
                label="อายุ"
                defaultValue="1001"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <p>ประวัติการแพ้ยา</p>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={patients.AllergyID}
                  onChange={handleChange}
                  inputProps={{ name: "AllergyID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {allergys.map((item: AllergyInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.INFORMATION}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p>โรคประจำตัว</p>
              <FormControl fullWidth variant="outlined">
                <Select
                  fullWidth
                  native
                  value={patients.Underlying_diseaseID}
                  onChange={handleChange}
                  inputProps={{ name: "Underlying_diseaseID" }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือก
                  </option>
                  {underlying_diseases.map(
                    (item: Underlying_diseaseInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.INFORMATION}
                      </option>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
      <br />
      <Grid container justifyContent="center">
        <div>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={submit}
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
