import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CrearCuenta from './CrearCuenta'

describe('CrearCuenta', () => {
  it('muestra error si el nombre es muy corto', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <CrearCuenta />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText('Ingresa tu nombre'), 'Al')
    await user.type(screen.getByPlaceholderText('Ingresa tu correo'), 'usuario@ejemplo.com')
    await user.type(screen.getByPlaceholderText('Contraseña'), '1234')
    await user.type(screen.getByPlaceholderText('Repite la contraseña'), '1234')
    const submitButton = screen.getAllByRole('button', { name: /Crear cuenta/i }).find((btn) => btn.getAttribute('type') === 'submit')
    await user.click(submitButton)

    expect(await screen.findByText(/El nombre debe tener al menos 3 caracteres/i)).toBeInTheDocument()
  })

  it('renderiza el formulario de crear cuenta', () => {
    render(
      <MemoryRouter>
        <CrearCuenta />
      </MemoryRouter>,
    )

    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Repite la contraseña')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Crear cuenta/i }).length).toBeGreaterThan(0)
  })

  it('muestra error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <CrearCuenta />
      </MemoryRouter>,
    )

    await user.type(screen.getByPlaceholderText('Ingresa tu nombre'), 'Alejandro')
    await user.type(screen.getByPlaceholderText('Ingresa tu correo'), 'usuario@ejemplo.com')
    await user.type(screen.getByPlaceholderText('Contraseña'), '1234')
    await user.type(screen.getByPlaceholderText('Repite la contraseña'), '4321')
    const submitButton = screen.getAllByRole('button', { name: /Crear cuenta/i }).find((btn) => btn.getAttribute('type') === 'submit')
    await user.click(submitButton)

    expect(await screen.findByText(/Las contraseñas no coinciden/i)).toBeInTheDocument()
  })
})
