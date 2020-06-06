import React, { useState, FormEvent, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoSVG from '../../assets/logo.svg'
import api from '../../services/api'

import { Title, Form, RepositoriesList, InputError } from './styles'

interface IRepository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Home: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Array<IRepository>>(() => {
    const savedRepositories = localStorage.getItem(
      '@github_explorer:repositories'
    )

    if (savedRepositories) {
      return JSON.parse(savedRepositories)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      '@github_explorer:repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório')
      return
    }

    try {
      const res = await api.get<IRepository>(`/repos/${newRepo}`)

      const repository = res.data

      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Erro na buscar por esse repositório')
    }
  }

  return (
    <>
      <img src={logoSVG} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <InputError>{inputError}</InputError>}

      <RepositoriesList>
        {repositories.map((repository) => (
          <li key={repository.full_name}>
            <Link to={`/repos/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <h2>{repository.full_name}</h2>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </li>
        ))}
      </RepositoriesList>
    </>
  )
}

export default Home
