import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import logoSVG from '../../assets/logo.svg'
import { Header, RepositoryInfo, IssuesList } from './styles'
import api from '../../services/api'

interface IRepositoryParams {
  repository: string
}

interface IRepository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface IIssue {
  id: number
  title: string
  html_url: string
  user: {
    login: string
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null)
  const [issues, setIssues] = useState<Array<IIssue>>([])

  const { params } = useRouteMatch<IRepositoryParams>()

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [repositoryRes, issuesRes] = await Promise.all([
        api.get(`/repos/${params.repository}`),
        api.get(`/repos/${params.repository}/issues`),
      ])

      setRepository(repositoryRes.data)
      setIssues(issuesRes.data)
    }

    loadData()
  }, [params.repository])

  return (
    <>
      <Header>
        <img src={logoSVG} alt="Github explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <IssuesList>
        {issues.map((issue) => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blanck">
              <div>
                <h2>{issue.title}</h2>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          </li>
        ))}
      </IssuesList>
    </>
  )
}

export default Repository
