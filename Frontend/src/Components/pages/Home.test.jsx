import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('muestra el título de la página de inicio', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Página de inicio/i)).toBeInTheDocument()
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument()
  })
})
