import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '../utils'

export const metadata: Metadata = {
  title: getPageTitle(),
}

export default function Page() {
  return redirect('/home')
}
