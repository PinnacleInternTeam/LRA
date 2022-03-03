import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import TenantReport from "./TenantReport";

import DatePicker from "react-datepicker";
import {
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
} from "../../actions/tenants";
import NotFound from "../layout/NotFound";

const optName = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "09", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const TenantFilters = ({
  auth: { isAuthenticated, user, users, monthExpCnt, yearExpCnt, expReport },
  // tenants: {},
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
}) => {
  useEffect(() => {
    getMonthExpCount();
  }, [getMonthExpCount]);
  useEffect(() => {
    const finalData = {
      selectedVal: new Date(),
    };
    getPreviousYearsExpCount(finalData);
  }, [getPreviousYearsExpCount]);
  useEffect(() => {
    const finalDataReport = {
      monthSearch: new Date().getMonth() + 1,
      yearSearch: new Date().getFullYear(),
    };
    getTenantReportYearMonth(finalDataReport);
  }, [getTenantReportYearMonth]);

  const [searchData, setSearchData] = useState({
    monthSearch: "",
    yearSearch: "",
  });

  const { monthSearch, yearSearch } = searchData;

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const monthYearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
    if (getYear) {
      setMonthStartDate(dt);
      const finalData = {
        selectedY: getYear,
        selectedVal: dt,
      };
      getMonthExpCountFilter(finalData);
      getPreviousYearsExpCount(finalData);
    }
  };

  const onSelectChange = (optFiltrVal) => {
    if (optFiltrVal) {
      setSearchData({
        ...searchData,
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      });
      const finalDataReport = {
        monthSearch: optFiltrVal,
        yearSearch: new Date(startMonthDate).getFullYear(),
      };
      console.log(finalDataReport);
      getTenantReportYearMonth(finalDataReport);
      <Redirect to="/tenant-report" />;
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      <div className="container_align top_menu">
        <div className="row ">
          <div className="col-lg-12 py-4 col-md-1 col-sm-1 col-1 text-center ">
            {/* brdr-clr-styles */}
            <form>
              <div className="py-2">
                <button className="btn btn_more">{yearExpCnt}</button>
                {/* className="btn-rou" */}
              </div>
              <div className="py-3">
                <DatePicker
                  className="form-control yearpicker"
                  placeholder="yyyy"
                  //   maxDate={subMonths(new Date(), -1)}
                  onChange={(date) => monthYearChange(date)}
                  dateFormat="yyyy"
                  selected={startMonthDate}
                  style={{ textAlign: "center" }}
                  showYearPicker
                />
              </div>

              {optName &&
                optName.map((optFiltr, idx) => {
                  let countVal = 0;
                  monthExpCnt.map((monthExpCntVal) => {
                    if (
                      Number(monthExpCntVal._id.month) ===
                      Number(optFiltr.value)
                    ) {
                      countVal = monthExpCntVal.count;
                    }
                    return <></>;
                  });
                  return (
                    <div className="py-2" key={idx}>
                      <div style={{ color: "#fff" }}>
                        {" "}
                        <Link
                          to="#"
                          name="alphaSearch"
                          // className="btnLink"
                          onClick={() => onSelectChange(optFiltr.value)}
                          style={{ fontWeight: "bold", fontSize: "19px" }}
                        >
                          {optFiltr.label}
                        </Link>{" "}
                        &nbsp;
                        <label
                          className="btn-roun"
                          style={
                            countVal !== 0
                              ? {
                                  fontSize: "15px",
                                  color: "red",
                                  background: "#fff",
                                }
                              : {
                                  fontSize: "15px",
                                  color: "#429f8c",
                                  background: "#fff",
                                }
                          }
                        >
                          {countVal}
                        </label>
                      </div>
                      <div> </div>
                    </div>
                  );
                })}
            </form>
          </div>

          {/* <div className="col-lg-10 col-md-7 col-sm-8 col-8">
            <TenantReport />
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

TenantFilters.propTypes = {
  auth: PropTypes.object.isRequired,
  getMonthExpCount: PropTypes.func.isRequired,
  getMonthExpCountFilter: PropTypes.func.isRequired,
  getPreviousYearsExpCount: PropTypes.func.isRequired,
  getTenantReportYearMonth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getMonthExpCount,
  getMonthExpCountFilter,
  getPreviousYearsExpCount,
  getTenantReportYearMonth,
})(TenantFilters);