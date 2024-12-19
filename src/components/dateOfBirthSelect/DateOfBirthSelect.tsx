// src/components/DateOfBirthSelect.tsx
import React, { useState, useEffect } from "react";
import { FormikProps } from "formik";
import Select from "../UI/select/Select";
import styles from "./DateOfBirthSelect.module.css";
import { useMediaQuery } from "react-responsive";

interface DateOfBirthSelectProps {
  formik: FormikProps<any>; // Formik instance passed as a prop
}

const DateOfBirthSelect: React.FC<DateOfBirthSelectProps> = ({ formik }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (_, index) => currentYear - index);
  const months = Array.from(new Array(12), (_, index) => 1 + index);

  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const dateError =
    (formik.touched.birth_year && formik.errors.birth_year) ||
    (formik.touched.birth_month && formik.errors.birth_month) ||
    (formik.touched.birth_day && formik.errors.birth_day);

  // State for selected year and month
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [days, setDays] = useState<number[]>([]);

  // Update days in the dropdown based on selected year and month
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      setDays(Array.from(new Array(daysInMonth), (_, index) => 1 + index));
    }
  }, [selectedYear, selectedMonth]);

  return (
    <div
      className={styles.dateOfBirthSelectContainer}
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <Select
        {...formik.getFieldProps("birth_year")}
        label="Year"
        options={years.map((year) => ({
          value: year.toString(),
          label: year.toString(),
        }))}
        containerClassName={styles.selectContainer}
        selectClassName={styles.select}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedYear(parseInt(e.target.value));
          formik.handleChange(e); // Call Formik’s change handler
        }}
      />
      <Select
        {...formik.getFieldProps("birth_month")}
        label="Month"
        options={months.map((month) => ({
          value: month.toString(),
          label: month.toString(),
        }))}
        containerClassName={styles.selectContainer}
        selectClassName={styles.select}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedMonth(parseInt(e.target.value));
          formik.handleChange(e); // Call Formik’s change handler
        }}
      />
      <Select
        {...formik.getFieldProps("birth_day")}
        label="Day"
        options={days.map((day) => ({
          value: day.toString(),
          label: day.toString(),
        }))}
        containerClassName={styles.selectContainer}
        selectClassName={styles.select}
      />
    </div>
  );
};

export default DateOfBirthSelect;
