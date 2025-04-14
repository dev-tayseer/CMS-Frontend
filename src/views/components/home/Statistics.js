import React from 'react'
import userIcon from "@src/assets/images/svg/user.svg"
import carIcon from "@src/assets/images/svg/Car.svg"
import { array } from 'prop-types'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { HomeIcon, HomeDep,HomeCon,HomeCom,HomeAd } from '../icons/all_icons'


function Statistics({ contractNumber,departmentNumber,companyNumber,adminNumber }) {

    return (
        <>
            <div className='row pt-1 ps-md-0 ps-2'>
                <div className='col-lg-3 mt-3'>
                    <div className='col-12 d-flex jsutify-content-start stat-element text-center py-3'>

                        <div className='py-4 px-3'>
                            <HomeDep />
                        </div>
                        <div>
                            <div className='pt-3 stat-element-header'>{contractNumber}</div>
                            <div className='pb-3 pt-2 stat-element-body'>عدد العقود</div>
                        </div>

                    </div>
                </div>
                <div className='col-lg-3 mt-3'>
                    <div className='col-12 d-flex jsutify-content-start stat-element text-center py-3'>
                    <div className='py-4 px-3'>
                            <HomeCon />
                        </div>
                        <div>
                            <div className='pt-3 stat-element-header'>{departmentNumber}</div>
                            <div className='pb-3 pt-2 stat-element-body'>عدد الإدارات</div>
                        </div>

                        {/* <div className='py-3 stat-element-header'>{departmentNumber}</div>
                        <div className='pb-3 stat-element-body'>عدد الإدارات</div> */}

                    </div>
                </div>
                <div className='col-lg-3 mt-3'>
                    <div className='col-12 d-flex jsutify-content-start stat-element text-center py-3'>
                    <div className='py-4 px-3'>
                            <HomeAd />
                        </div>
                        <div>
                            <div className='pt-3 stat-element-header'>{companyNumber}</div>
                            <div className='pb-3 pt-2 stat-element-body'>عدد الشركات</div>
                        </div>

                        {/* <div className='py-3 stat-element-header'>{companyNumber}</div>
                        <div className='pb-3 stat-element-body'>عدد الشركات</div> */}

                    </div>
                </div>
                <div className='col-lg-3 mt-3'>
                    <div className='col-12 d-flex jsutify-content-start stat-element text-center py-3'>
                    <div className='py-4 px-3'>
                            <HomeCom />
                        </div>
                        <div>
                            <div className='pt-3 stat-element-header'>{adminNumber}</div>
                            <div className='pb-3 pt-2 stat-element-body'>عدد المشرفين</div>
                        </div>

                        {/* <div className='py-3 stat-element-header'>{companyNumber}</div>
                        <div className='pb-3 stat-element-body'>عدد الشركات</div> */}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Statistics

