import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { githubApi } from 'src/api/githubApi'
import { Issue } from '../interfaces'
import { computed } from 'vue'

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
  return data
}


const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
  return data
}



interface Options {
  autoload?: boolean
}


const useIssue = (issueNumber: number, options?: Options) => {
  const { autoload = true } = options || {};

  const queryClient = useQueryClient()

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      staleTime: 1000 * 60 * 60, // 1 hora
      enabled: autoload
    }
  )

  const { data: comments, isLoading: commentsIsLoading } = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueNumber),
    //() => getIssueComments(issueQuery.data.value?.number || 0), //hace que el query se haga despues del issueQuery
    {
      staleTime: 1000 * 60 * 60, // 1 hora
      enabled: autoload
      //enabled: computed(() => !!issueQuery.data.value) // validar que el se ejecuter el useQueryComment conado tenga un valor revuelto de issues y computed para que sea reactivo
    }
  )

  const prefetchIssue = (issuesNumber: number) => {

    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60 // 1 min
      }
    )

    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssueComments(issueNumber),
      {
        staleTime: 1000 * 15, // 15 seg
        // no funciona en prefetching enabled
      }
    )
  }

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(
      ['issue', issue.number],
      issue
    )
  }


  return {
    data: issueQuery.data,
    isLoading: issueQuery.isLoading,
    comments,
    commentsIsLoading,

    //Methods
    prefetchIssue,
    setIssueCacheData,
  }
}


export default useIssue