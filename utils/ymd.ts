// utils/date.ts
export const ymd = (input: any) => {
  const d: Date =
    input?.toDate ? input.toDate() : input instanceof Date ? input : new Date(input);

  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
};

// export const ymdLocal = (input: any) => {
//   const d: Date = input?.toDate ? input.toDate() : input instanceof Date ? input : new Date(input);
//   const pad = (n: number) => String(n).padStart(2, "0");
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// };
