import React, {useState} from 'react'

export default function loginForm() {
  return (
    <div>
    <form>
        <div className="form-group">
            <label htmlFor='email'>البريد الإلكتروني</label>
            <input type='email' name="email" id="email"  />
        </div>
        <div className="form-group">
            <label htmlFor='password'>كلمة المرور</label>
            <input type='password' name="password" id="password" />
        </div>
    </form>
    </div>
  )
}