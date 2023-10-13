
import React from 'react'
import {classNames} from "../../../utils/css.ts";

export interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
  Required<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>> {
  title?: string
  classname?: string
  disabled?: boolean
  variant?: 'primary' | 'warning' | 'darker'
  error?: string
  iconRight?: React.ReactNode
  iconLeft?: React.ReactNode
}
export const Button: React.FC<Props> = ({
  title,
  classname = '',
  variant = 'primary',
  error = '',
  iconRight = '',
  iconLeft = '',
  ...props
}) => {
  const classnameByVariant = {
    primary: 'box-border bg-green-default text-black-darker  hover:bg-green-hover focus:ring-2 focus:ring-green-default disabled:bg-[#56A76F] disabled:opacity-50',
    warning: 'box-border bg-red-default text-white  hover:bg-red-hover  focus:ring-2 focus:ring-red-default disabled:bg-red-hover disabled:opacity-50',
    darker: 'box-border bg-[#020409] text-[#7E858F] border-2 border-[#2B2D31]  hover:bg-[#171B21]  focus:bg-[#171B21] disabled:bg-[#2B2D31] disabled:opacity-50'
  }
  return (
    <button
      disabled={props.disabled}
      className={classNames(
        `${classnameByVariant[variant]}`,
        'box-border flex gap-[10px]  items-center px-5 py-3 font-normal text-xs rounded-lg  leading-none', classname
      )}
      {...props}
    >
      {iconLeft}{title}{iconRight}
    </button>
  )
}
