import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

describe('Login', () => {
  it('renderiza el formulario de login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    expect(screen.getByPlaceholderText('admin@ejemplo.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('muestra mensaje de credenciales incorrectas', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText('admin@ejemplo.com'), 'usuario@ejemplo.com')
    await user.type(screen.getByPlaceholderText('********'), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(await screen.findByText(/Credenciales incorrectas/i)).toBeInTheDocument()
  })

  it('muestra mensaje de bienvenido con credenciales correctas', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText('admin@ejemplo.com'), 'admin@ejemplo.com')
    await user.type(screen.getByPlaceholderText('********'), '1234')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(await screen.findByText(/¡Bienvenido de nuevo!/i)).toBeInTheDocument()
  })
})
