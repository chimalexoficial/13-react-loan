import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import { formatMoney, totalToPay, monthlyPayment } from './helpers/index.js'

function App() {

  const [quantity, setQuantity] = useState(10000);
  const [months, setMonths] = useState(6);
  const [total, setTotal] = useState(0);
  const [monthlyPay, setMonthlyPay] = useState(6);
  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  useEffect(() => {
    const totalResultPay = totalToPay(quantity, months);
    setTotal(totalResultPay);
  }, [quantity, months]);

  useEffect(() => {
        const finalPay = monthlyPayment(total, months);
    setMonthlyPay(finalPay);
  }, [total])

  function handleChange(e) {
    setQuantity(Number(e.target.value));
  }

  function handleClickDecrement() {
    const value = quantity - STEP;

    if (value < MIN) {
      alert('Invalid quantity');
      return;
    }

    setQuantity(value);

  }

  function handleClickIncrement() {
    const value = quantity + STEP;

    if (value > MAX) {
      alert('Invalid quantity');
      return;
    }

    setQuantity(value);

  }

  return (
    <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>

      <Header />

      <div className='flex justify-between my-6'>

        <Button
          operator='-'
          fn={handleClickDecrement} />
        <Button
          operator='+'
          fn={handleClickIncrement} />

      </div>

      <input
        type='range'
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={quantity}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>{formatMoney(quantity)}</p>

      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>Choose a<span className='text-indigo-600'> term </span>to pay</h2>

      <select className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={months}
        onChange={e => setMonths(e.target.value)}>
        <option value={6}>6 months</option>
        <option value={12}>12 months</option>
        <option value={24}>24 months</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-100 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>Payment <span className='text-indigo-600'>summary</span></h2>

        <p className='text-xl text-gray-500 text-center font-bold'>{months} months</p>
        <p className='text-xl text-gray-500 text-center font-bold'>Total to pay: {formatMoney(total)}</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatMoney(monthlyPay)} Monthly</p>
      </div>


    </div>
  )
}

export default App
