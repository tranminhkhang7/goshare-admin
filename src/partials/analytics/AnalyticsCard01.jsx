import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart03';

// Import utilities
import {
  tailwindConfig,
  hexToRGB,
  formatCurrency,
  formatDate,
  formatDateWithFirstMonth,
} from '../../utils/Utils';

function AnalyticsCard01(props) {
  const [range, setRange] = useState(7);
  const filterAndSortUniqueDatesWithin30Days = (data) => {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - range);

    const uniqueDatesSet = new Set();

    const filteredData = data
      .filter((item) => {
        const createTime = new Date(item.createTime);
        const formattedDate = createTime.toLocaleDateString('en-GB'); // Format as dd-MM-yyyy

        if (createTime >= thirtyDaysAgo && createTime <= currentDate) {
          if (!uniqueDatesSet.has(formattedDate)) {
            uniqueDatesSet.add(formattedDate);
            return true;
          }
        }

        return false;
      })
      .sort((a, b) => new Date(a.createTime) - new Date(b.createTime));

    return filteredData;
  };

  const calculateTotalAmountPerDayWithin7Days = (data) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - range);

    // Sort the data array based on createTime
    data.sort((a, b) => new Date(a.createTime) - new Date(b.createTime));

    const totalAmountPerDay = {};

    data.forEach((item) => {
      const createTime = new Date(item.createTime);
      const formattedDate = createTime.toLocaleDateString('en-GB'); // Format as dd-MM-yyyy

      if (createTime >= sevenDaysAgo && createTime <= currentDate) {
        if (totalAmountPerDay[formattedDate]) {
          totalAmountPerDay[formattedDate] += item.amount;
        } else {
          totalAmountPerDay[formattedDate] = item.amount;
        }
      }
    });

    return totalAmountPerDay;
  };

  const [chartData, setChartData] = useState();

  useEffect(() => {
    const filteredData = filterAndSortUniqueDatesWithin30Days(props.data);
    const dateArray = filteredData.map((item) =>
      formatDateWithFirstMonth(item.createTime)
    );

    const totalAmountPerDayWithin7Days = calculateTotalAmountPerDayWithin7Days(
      props.data
    );
    const amountArray = Object.values(totalAmountPerDayWithin7Days);

    setChartData({
      labels: dateArray,
      datasets: [
        {
          label: 'Current',
          data: amountArray,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(
            tailwindConfig().theme.colors.blue[500]
          )}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          clip: 20,
        },
      ],
    });
  }, [props.data, range]);

  // Sample transactions data
  const transactions = props.data;

  // Function to calculate the total amount within a date range
  function getTotalAmount(transactions, startDate, endDate) {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createTime);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    const totalAmount = filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);

    return totalAmount;
  }

  // Function to calculate the difference between two totals
  function calculateDifference(total1, total2) {
    return total1 - total2;
  }

  // Get today's date
  const today = new Date();

  // Calculate yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Calculate this week's start and end dates
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
  const thisWeekEnd = today; // Today

  // Calculate last week's start and end dates
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - today.getDay() - 7); // Start of the week (Sunday)
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(lastWeekStart.getDate() + 6); // End of the week (Saturday)

  // Calculate this month's start and end dates
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = today; // Today

  // Calculate last month's start and end dates
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  // Calculate today's total
  const todayTotal = getTotalAmount(transactions, today, today);

  // Calculate yesterday's total
  const yesterdayTotal = getTotalAmount(transactions, yesterday, yesterday);

  // Calculate this week's total
  const thisWeekTotal = getTotalAmount(
    transactions,
    thisWeekStart,
    thisWeekEnd
  );

  // Calculate last week's total
  const lastWeekTotal = getTotalAmount(
    transactions,
    lastWeekStart,
    lastWeekEnd
  );

  // Calculate this month's total
  const thisMonthTotal = getTotalAmount(
    transactions,
    thisMonthStart,
    thisMonthEnd
  );

  // Calculate last month's total
  const lastMonthTotal = getTotalAmount(
    transactions,
    lastMonthStart,
    lastMonthEnd
  );

  // Calculate the differences
  const todayVsYesterdayDiff = calculateDifference(todayTotal, yesterdayTotal);
  const thisWeekVsLastWeekDiff = calculateDifference(
    thisWeekTotal,
    lastWeekTotal
  );
  const thisMonthVsLastMonthDiff = calculateDifference(
    thisMonthTotal,
    lastMonthTotal
  );

  // Log the results
  // console.log("Today's Earnings:", todayTotal);
  // console.log('Difference with Yesterday:', todayVsYesterdayDiff);

  // console.log("This Week's Earnings:", thisWeekTotal);
  // console.log('Difference with Last Week:', thisWeekVsLastWeekDiff);

  // console.log("This Month's Earnings:", thisMonthTotal);
  // console.log('Difference with Last Month:', thisMonthVsLastMonthDiff);

  return (
    <div className='flex flex-col bg-white border rounded-sm shadow-lg col-span-full xl:col-span-8 border-slate-200'>
      <header className='flex items-center px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Chênh lệch doanh thu</h2>
      </header>
      <div className='px-5 py-1'>
        <div className='flex flex-wrap'>
          {/* Unique Visitors */}
          <div className='flex items-center py-2'>
            <div className='mr-5'>
              <div className='flex items-center'>
                <div className='mr-2 text-3xl font-bold text-slate-800'>
                  {formatCurrency(todayTotal)}đ
                </div>
                <div className='text-sm font-medium text-emerald-500'>
                  {!yesterdayTotal || yesterdayTotal === 0
                    ? 'n/a'
                    : (((todayTotal - yesterdayTotal) * 100) / yesterdayTotal)
                        .toPrecision(3)
                        .toString() + '%'}
                </div>
              </div>
              <div className='text-sm text-slate-500'>Trong ngày</div>
            </div>
            <div
              className='hidden w-px h-8 mr-5 md:block bg-slate-200'
              aria-hidden='true'
            ></div>
          </div>
          {/* Total Pageviews */}
          <div
            className='flex items-center py-2 cursor-pointer'
            onClick={() => setRange(7)}
          >
            <div className='mr-5'>
              <div className='flex items-center'>
                <div className='mr-2 text-3xl font-bold text-slate-800'>
                  {formatCurrency(thisWeekTotal)}đ
                </div>
                <div className='text-sm font-medium text-emerald-500'>
                  {!lastWeekTotal || lastWeekTotal === 0
                    ? 'n/a'
                    : (((thisWeekTotal - lastWeekTotal) * 100) / lastWeekTotal)
                        .toPrecision(3)
                        .toString() + '%'}
                </div>
              </div>
              <div className='text-sm text-slate-500'>Trong tuần</div>
            </div>
            <div
              className='hidden w-px h-8 mr-5 md:block bg-slate-200'
              aria-hidden='true'
            ></div>
          </div>
          {/* Bounce Rate */}
          <div
            className='flex items-center py-2 cursor-pointer'
            onClick={() => setRange(30)}
          >
            <div className='mr-5'>
              <div className='flex items-center'>
                <div className='mr-2 text-3xl font-bold text-slate-800'>
                  {formatCurrency(thisMonthTotal)}đ
                </div>
                <div className='text-sm font-medium text-amber-500'>
                  {!lastMonthTotal || lastMonthTotal === 0
                    ? 'n/a'
                    : (
                        ((thisMonthTotal - lastMonthTotal) * 100) /
                        lastMonthTotal
                      )
                        .toPrecision(3)
                        .toString() + '%'}
                </div>
              </div>
              <div className='text-sm text-slate-500'>Trong tháng</div>
            </div>
            <div
              className='hidden w-px h-8 mr-5 md:block bg-slate-200'
              aria-hidden='true'
            ></div>
          </div>
          {/* Visit Duration*/}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <h2 className='my-5 ml-5 font-semibold text-slate-800'>
        Dao động trong{' '}
        <span
          className='underline cursor-pointer'
          onClick={() => setRange(range === 7 ? 30 : 7)}
        >
          {range === 30 ? 'tháng' : 'tuần'}
        </span>
      </h2>
      <div className='grow'>
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={800} height={300} />
      </div>
    </div>
  );
}

export default AnalyticsCard01;
