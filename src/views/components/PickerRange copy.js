// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const PickerRange  = ({className, dir, functionHandler, picker}) => {
  // ** State
  const mainClass = "form-control range-picker "

  return (
    <div className={className} dir={dir}>
      <Flatpickr
        value={picker}
        id='range-picker'
        className={ mainClass } 
        onChange={date => functionHandler(date)}
        options={{
          mode: 'range',
          defaultDate: ['2020-02-01', '2020-02-15']
        }}
      />
      </div>
  )
}

export default PickerRange


// // ** React Imports
// import { Fragment, useState, useEffect } from 'react'

// // ** Reactstrap Imports
// import { Label } from 'reactstrap'

// // ** Third Party Components
// import Flatpickr from 'react-flatpickr'


// const PickerRange  = ({className, dir, functionHandler, picker}) => {
//   // ** State
//   const mainClass = "form-control range-picker "
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [isPageLoaded, setIsPageLoaded] = useState(false)
//   const mapMonthesForDate = {
//     "01":'Jan',
//     "02":'Feb',
//     "03":'Mar',
//     "04":'Apr',
//     "05":'May',
//     "06":'Jun',
//     "07":'Jul',
//     "08":'Aug',
//     "09":'Sep',
//     10:'Oct',
//     11:'Nov',
//     12:'Dec'
//   }
  
//   // document.querySelector("closeDatePicker").addEventListener

//   useEffect(() => {
//     const element = document.querySelector(".flatpickr-weekdays")
//     const newElement = document.createElement("div")
//     function handleClose() {
//       // console.log("clicked")
//       const flatpickr_calendar = document.querySelector("flatpickr-calendar")
//       flatpickr_calendar.classList.remove("open")
//     }
//     const newContent = `
//       <div class="inputs-container  me-2">
//       <div class="row mb-2">
//         <div class="col-1><div>
//         <div class="col-10">
//           <div class="row">
//             <div class="col-5 ps-2 mt-1">
//             <input type="text" class="form-control customDate ms-3 w-100" readonly value=""  id="input1" />
//             <input type="hidden" class="form-control customDate ms-3 w-100" readonly value=""  id="hidden_input1" />
//             </div>
//             <div class="col-2">
//             <span class="ms-3">_</span>
//             </div>
//             <div class="col-5 pe-2 mt-1">
//               <div class="me-2">
//               <input type="text" class="form-control customDate w-100" readonly value=""  id="input2" />
//               <input type="hidden" class="form-control customDate ms-3 w-100" readonly value=""  id="hidden_input2" />
//               </div>
//             </div>
//           </div>

//         </div>
//         <div class="col-1><div>
//         </div>

//       </div>
//     `
//     newElement.innerHTML += (newContent)
//     element.parentNode.insertBefore(newElement, element.nextSibling)

//     const elementAfter = document.querySelector(".flatpickr-days")
//     const newElementAfter = document.createElement("div")
//     const newContentAfter = `
//       <div class="inputs-container  me-2 mt-2">
//       <div class="row mb-2">
//         <div class="col-1><div>
//         <div class="col-10">
//           <div class="row">
//             <div class="col-6 ps-2 mt-1">
//               <button  class="btn w-100 ms-3 closeDatePicker DatePickerBtn">إلغاء</button>
//             </div>
//             <div class="col-6 pe-2 mt-1">
//               <div class="me-2">
//                   <button  class="btn w-100 activateDatePicker DatePickerBtn">تصفية</button>

//               </div>
//             </div>
//           </div>

//         </div>
//         <div class="col-1><div>
//         </div>

//       </div>
//     `
//     newElementAfter.innerHTML += (newContentAfter)
//     elementAfter.parentNode.insertBefore(newElementAfter, elementAfter.nextSibling)
//     setIsLoaded(true)
//   }, [])

//   useEffect(() => {
//     if (isLoaded) {
//         const closeDatePicker = document.querySelector(".closeDatePicker")
//         const activateDatePicker = document.querySelector(".activateDatePicker")
//         closeDatePicker.addEventListener("click", function() {
//           console.log("close .......")
//           const range_picker = document.getElementById("range-picker")
//           const selected = document.querySelector(".selected")
//           const inRange = document.querySelector(".inRange")
//           const endRange = document.querySelector(".endRange")
//           const flatpickr_day = document.querySelector(".flatpickr-day")
          
//           const dayContainer = document.querySelector(".dayContainer")

//           range_picker.value = "" 
//           input1.value = ""
//           input2.value = ""
//           hidden_input1.value = ""
//           hidden_input2.value = ""
//           functionHandler({i1:hidden_input1.value, i2:hidden_input2.value})
//           // selected.classList.remove("startRange")
//           // endRange.classList.remove("endRange")
//           // selected.classList.remove("selected")
//           // flatpickr_day.classList.remove("selected")


//           // flatpickr-calendar rangeMode animate arrowTop arrowLeft open
//           // flatpickr-calendar rangeMode animate arrowTop arrowLeft
//           const flatpickr_calendar = document.querySelector(".flatpickr-calendar")
//           const flatpickr_input = document.querySelector(".flatpickr-input")

//           flatpickr_calendar.classList.remove("open")
//           flatpickr_input.classList.remove("active")
//           // flatpickr_day.classList.remove("selected")
//           // flatpickr_day.classList.remove("startRange")
//           // flatpickr_day.classList.remove("endRange")
 

//           // flatpickr_day.classList.remove("selected")

//           // selected startRange endRange inRange

//           // flatpickr_calendar.classList.remove("arrowLeft")
//           // flatpickr_calendar.classList.remove("arrowTop")
//           // flatpickr_calendar.classList.remove("animate")
//           // flatpickr_calendar.classList.remove("rangeMode")

//           // flatpickr_calendar.classList.add("open")
//           // flatpickr_calendar.classList.add("arrowLeft")
//           // flatpickr_calendar.classList.add("arrowTop")
//           // flatpickr_calendar.classList.add("animate")
//           // flatpickr_calendar.classList.add("rangeMode")

//           // flatpickr_calendar.classList.remove("flatpickr-calendar    ")
//           // flatpickr_calendar.classList.add("flatpickr-calendar rangeMode animate arrowTop arrowLeft")

//         })
//         activateDatePicker.addEventListener("click", function() {
//           // console.log("clicked .......")

//           functionHandler({i1:hidden_input1.value, i2:hidden_input2.value})
//           const flatpickr_calendar = document.querySelector(".flatpickr-calendar")
//           const flatpickr_input = document.querySelector(".flatpickr-input")

//           flatpickr_calendar.classList.remove("open")
//           flatpickr_input.classList.remove("active")

//         })
//         // console.log(closeDatePicker, "close ")
//         // setIsPageLoaded(true)
//     }
// }, [isLoaded])
  
// function handleClick(event) {
//   // const flatpickr_input = document.querySelector(".flatpickr-input")
//   const flatpickr_calendar = document.querySelector(".flatpickr-calendar")
//   flatpickr_calendar.classList.add("open")

// }
//   function handleChange(event) {
//     const range_picker = document.getElementById("range-picker")
//     // const flatpickr_calendar = document.querySelector(".flatpickr-calendar")
//     // flatpickr_calendar.classList.add("open")
    
//     if (event.length === 1) {
//       // const dateTime1 = event[0].toISOString()
//       // console.log(dateTime1, event[0].getDay(), typeof(event[0]), "datetime11111")
//       const dateTime1 = (new Date(Date.parse(event[0]))).toString()
//       const date1 = dateTime1.split(" ")
//       const day = `${date1[1]}`
//       const month = `${date1[2]}`
//       // console.log(month, "month ------")
//       const year = `${date1[3]}`

//       // `${date11[1]} , ${date11[2]} ${date11[3]}`
//       // const date1 = dateTime1.split("T")[0]
//       // const day = date1.split('-')[0]
//       // const month = date1.split('-')[1]
//       // console.log(month, "month ------")
//       // const year = date1.split('-')[2]
//       input1.value = ` ${day} ${month} , ${year}`
//       hidden_input1.value = event[0].toISOString()
//       const new_range_picker_first = range_picker.value.split("to")[0] 
//       range_picker.value = new_range_picker_first 
//     } else {
//       const dateTime1 = event[0].toISOString()
//       const date1 = dateTime1.split("T")[0]
//       const day = date1.split('-')[0]
//       const month = date1.split('-')[1]
//       const year = date1.split('-')[2]
//       input1.value = ` ${mapMonthesForDate[month]} ${year} , ${day}`  
//       hidden_input1.value = event[0].toISOString()
      
//       const dateTime2 = event[1].toISOString()
//       // console.log(dateTime2, "0000000")
//       const date2 = dateTime2.split("T")[0]
//       // console.log(date2)
//       const day2 = date2.split('-')[0]
//       const month2 = date2.split('-')[1]
//       const year2 = date2.split('-')[2]
//       input2.value = ` ${mapMonthesForDate[month2]} ${year2} , ${day2}` 
//       hidden_input2.value = event[1].toISOString()  
//       const new_range_picker_first = range_picker.value.split("to")[0]
//       const new_range_picker_second = range_picker.value.split("to")[1]
 
//       // range_picker.value = 'من' + new_range_picker_first + new_range_picker_second + "إلى"
//       range_picker.value = ` من  ${new_range_picker_first} إلى ${new_range_picker_second} `

//      }
//     //  console.log(range_picker, range_picker.value, "0000")
//      functionHandler({i1:hidden_input1.value, i2:hidden_input2.value})
//     //  flatpickr_calendar.classList.add("open")

     
//     //  2022-12-06 to 2022-12-13


//     // input1.value = event[0]
    
//     // console.log(functionHandler(date), "-----------")
//   }
//     // date => functionHandler(date)

//   return (
    
//     <div className={className} dir={dir}>
//       <Flatpickr
//         // value={picker}
//         placeholder="تصفية التاريخ"
//         id='range-picker'
//         className={ mainClass } 
//         onClick={handleClick}
//         onChange={handleChange}
//         options={{
//           mode: 'range'
//           // defaultDate: ['2020-02-01', '2020-02-15']
//         }}

//       />
//       </div>
//   )
// }

// export default PickerRange
// // const dateTime1 = (new Date(Date.parse(event[0]))).toString()
