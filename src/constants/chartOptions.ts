import { ChartConfiguration } from "chart.js";

const COLOR_WHITE = "#ececec";
const COLOR_GRAY = "#353535";
const COLOR_DARK_GRAY = "#232222";

export const horizontalBarOptions: Omit<ChartConfiguration, "data"> = {
  type: "bar" as const,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: "y",
    scales: {
      y: {
        ticks: {
          color: COLOR_WHITE,
        },
      },
      x: {
        ticks: {
          color: COLOR_WHITE,
          stepSize: 2,
        },
        grid: {
          color: COLOR_GRAY,
        },
      },
    },
  },
};
export const verticalBarOptions: Omit<ChartConfiguration, "data"> = {
  type: "bar" as const,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: COLOR_WHITE,
          stepSize: 5,
        },
        grid: {
          color: COLOR_GRAY,
        },
      },
      x: {
        ticks: {
          color: COLOR_WHITE,
        },
      },
    },
  },
};
export const lineTotalOptions: Omit<ChartConfiguration, "data"> = {
  type: "line" as const,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        // suggestedMax: 100,
        suggestedMin: -5000,
        ticks: {
          color: COLOR_WHITE,
          stepSize: 1000,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
      x: {
        ticks: {
          color: COLOR_WHITE,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
    },
  },
};

export const lineOptions: Omit<ChartConfiguration, "data"> = {
  type: "line" as const,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          color: COLOR_WHITE,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
      x: {
        ticks: {
          color: COLOR_WHITE,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
    },
  },
};

export const lineTotalMinOptions: Omit<ChartConfiguration, "data"> = {
  type: "line" as const,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        suggestedMax: 500,
        suggestedMin: 0,
        ticks: {
          color: COLOR_WHITE,
          stepSize: 10,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
      x: {
        ticks: {
          color: COLOR_WHITE,
        },
        grid: {
          color: COLOR_DARK_GRAY,
        },
      },
    },
  },
};
