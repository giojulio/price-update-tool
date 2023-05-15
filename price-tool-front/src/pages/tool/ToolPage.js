import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import axios from "axios";
import Papa from "papaparse";
import React, { useState } from "react";
import { Container } from "../../components/Container/StyledContainer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { FileArea, FileEG } from "./StyledToolPage";

export default function ToolPage() {
  const [file, setFile] = useState({});
  const [dialog, setDialog] = useState(false);
  const [buttonState, setButtonState] = useState({
    validate: true,
    update: true,
  });

  const onChangeFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setFile(results.data[0]);
      },
    });

    setButtonState({ ...buttonState, validate: false });
  };

  const onValidate = () => {
    if (!file.product_code || !file.new_price) {
      setFile({
        product_code: "Code not detected.",
        product_name: "Product Name not detected.",
        current_price: "Current Price not detected.",
        new_price: "New Price not detected.",
      });

      setDialog(true);
    }

    axios
      .get(`${process.env.BASE_URL}/${file.product_code}`)
      .then((response) => {
        setFile({
          ...file,
          product_name: response.name,
          current_price: response.sales_price,
        });

        setButtonState({ ...buttonState, update: false });
      })
      .catch((error) => {
        setFile({
          ...file,
          product_name: "Not Found.",
          current_price: "Not Found.",
        });
        alert(error.response);
      });

    setDialog(true);
  };

  const onUpdate = () => {
    axios
      .put(process.env.BASE_URL, file)
      .then((response) => {
        setFile({
          product_code: "",
          product_name: "",
          current_price: "",
          new_price: "",
        });
        setDialog(false);
        setButtonState({ validate: true, update: true });
      })
      .catch((error) => {
        alert(error.response);
      });
  };

  const onDialogClose = () => {
    setDialog(false);
  };

  const dialogComponent = () => {
    return (
      <Dialog open={dialog}>
        <DialogTitle>Please, review your data:</DialogTitle>
        <DialogContent>
          <h3>Product Code: {file.product_code}</h3>
          <h3>Product Name: {file.product_name} </h3>
          <h3>Current Price: {file.current_price}</h3>
          <h3>New Price: {file.new_price}</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>CANCEL</Button>
          <Button
            color="primary"
            onClick={onUpdate}
            disabled={buttonState.update}
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <div>
          <h5>
            Please load your .csv file containing the updated information. One
            product/pack update at a time.
          </h5>
          <br />
          <h5>Files must be formatted as such:</h5>
          <FileEG>
            <code>{"product_code,new_price"}</code>
            <br />
            <code>{"16,25.50"}</code>
          </FileEG>
        </div>
        <FileArea>
          <Input
            type="file"
            name="file"
            inputProps={{ accept: ".csv" }}
            onChange={onChangeFile}
            fullWidth
          />
          <div>
            <Button onClick={() => window.location.reload()}>CANCEL</Button>
            <Button
              disabled={buttonState.validate}
              onClick={() => onValidate()}
            >
              VALIDATE
            </Button>
          </div>
        </FileArea>
        {dialogComponent()}
      </Container>
      <Footer />
    </div>
  );
}
