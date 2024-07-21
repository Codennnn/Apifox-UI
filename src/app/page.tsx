import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '../utils'

export const metadata: Metadata = {
  title: getPageTitle(),
}

export default function RootPage() {
  return redirect('/home')
}
