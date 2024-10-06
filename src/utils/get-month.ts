export const getMonthsFrom2023 = () => {
  const months = [];
  const startYear = 2023;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

  for (let year = startYear; year <= currentYear; year++) {
    const monthLimit = year === currentYear ? currentMonth : 12;
    for (let month = 1; month <= monthLimit; month++) {
      const monthValue = String(month).padStart(2, "0");
      months.push({
        label: `${new Date(year, month - 1).toLocaleString("default", {
          month: "short",
        })} ${year}`,
        value: `${year}-${monthValue}`,
      });
    }
  }

  return months;
};