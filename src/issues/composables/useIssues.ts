import { useQuery } from '@tanstack/vue-query'
import { githubApi } from 'src/api/githubApi';
import { Issue, State } from '../interfaces';
import useStore from './useStore';
// import { useIssuesStore } from 'src/stores/issues';
// import { storeToRefs } from 'pinia';


const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams({})

  if (state) params.append('state', state)

  if (labels.length > 0) {
    const labelsString = labels.join(',')
    params.append('labels', labelsString)
  }

  params.append('per_page', '10')

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params
  })

  return data;
}

const useIssues = () => {

  //primera forma de implementar el store
  // const issuesStore = useIssuesStore()
  // const { state, labels } = storeToRefs(issuesStore)


  //Segunda forma de implementar el store(con un composables)
  const { state, labels } = useStore()

  const issuesQuery = useQuery(
    ['issues', { state, labels }],
    () => getIssues(labels.value, state.value)
  )

  return {
    issuesQuery
  }
}


export default useIssues