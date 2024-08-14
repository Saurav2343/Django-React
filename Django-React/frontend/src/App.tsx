import axios from "axios";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

interface AppState {
  details: Array<{ employee: string; emailid: string }>;
  employee: string;
  emailid: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = { details: [], employee: "", emailid: "" };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/")
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => {
        console.error("Wrong data:", err);
      });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as unknown as Pick<
      AppState,
      keyof AppState
    >);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { employee, emailid } = this.state;
    axios
      .post("http://127.0.0.1:8000/", { employee, emailid })
      .then((res) => {
        this.setState((prevState) => ({
          details: [...prevState.details, res.data],
          employee: "",
          emailid: "",
        }));
      })
      .catch((err) => {
        console.error("Error submitting data:", err);
      });
  };

  render() {
    const columnDefs: ColDef[] = [
      { headerName: "Employee Name", field: "employee" },
      { headerName: "Email ID", field: "emailid" },
    ];

    return (
      <div style={{ height: 600, width: 600, margin: 30 }}>
        <header>
          <h1>Data Generated from Django</h1>
        </header>
        <hr />
        <div className="ag-theme-alpine" style={{ height: 400, width: 400 }}>
          <AgGridReact rowData={this.state.details} columnDefs={columnDefs} />
        </div>
        <hr />
        <form onSubmit={this.handleSubmit} style={{ height: 400, width: 600 }}>
          <div>
            <label style={{ margin: 10 }}>Employee Name:</label>
            <input
              type="text"
              name="employee"
              value={this.state.employee}
              onChange={this.handleChange}
              style={{ marginLeft: 10 }}
            />
          </div>
          <div>
            <label style={{ margin: 10 }}>Email ID:</label>
            <input
              type="email"
              name="emailid"
              value={this.state.emailid}
              onChange={this.handleChange}
              style={{ marginLeft: 68 }}
            />
          </div>
          <button type="submit" style={{ margin: 5 }}>
            Submit
          </button>
        </form>
        <hr />
      </div>
    );
  }
}

export default App;
