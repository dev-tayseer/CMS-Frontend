import React from 'react'
import userIcon from "@src/assets/images/svg/user.svg"
import carIcon from "@src/assets/images/svg/Car.svg"
import { array } from 'prop-types'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { HomeIcon, ArrowIcon } from '../icons/all_icons'


function NationalitiesHeader({ headerContract, headerContract2, headerContractObj, urlMain, withAdd = "false", nonext = "true" }) {

  return (
    <>
      <div className="row pt-3 pt-md-5 pb-3 header-home-small">
        <div className="col-md-9 ps-md-0 ps-3">
          <a href='/nationalities'>
            <span className='mt-1'>
              <HomeIcon />
            </span>
            <span className='ps-md-3 mt-2 headerContract'>

              {headerContract}

            </span>
          </a>
          {nonext == "true" && <>
            <span className='ps-md-3'><ArrowIcon /></span>
            {headerContract2 && (
              <>
                <a href={urlMain}>
                  <span className='ps-md-3 headerContractObj'> {headerContract2}</span>
                </a>
                <span className='ps-md-3'><ArrowIcon /></span>
              </>
            )}

            <span className='px-md-3 headerContractObj headerContractObjColored p-2 '> {headerContractObj}</span>

          </>}



        </div>
        {withAdd == "true" && (

          <div className='col-md-3'>
            <Button className='mb-3 text-center btn-style color-5F605F d-block p-2 w-100 f-w-700 f-s-20px background-FBB827 font-Cairo btn-bill' color='white' outline type='button'>  إضافة فاتورة  </Button>

          </div>
        )}

      </div>

    </>
  )
}



export default NationalitiesHeader