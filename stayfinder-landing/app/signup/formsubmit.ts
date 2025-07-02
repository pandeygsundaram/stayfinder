

  export const signupUser = async ({
    email,
    password,
    name,
  }: {
    email: string
    password: string
    name: string
  }) => {

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.msg || 'Signup failed')
      }

      return data

    } catch (err: any) {
      console.error(err)
      throw new Error(err)
    }
  }
