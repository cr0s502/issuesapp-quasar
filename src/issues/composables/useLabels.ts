import { useQuery } from '@tanstack/vue-query'
import { githubApi } from 'src/api/githubApi'
import { useIssuesStore } from 'src/stores/issues';
import { Label } from '../interfaces';
//import { storeToRefs } from "pinia";
import { computed } from 'vue';



const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi<Label[]>('/labels?per_page=100');
  return data
}

const useLabels = () => {
  const issuesStore = useIssuesStore()
  //const { labels } = storeToRefs(issuesStore) // nose pueden desetructurar directamente desde
  //el Store por que pierden reactividad por eso se desestructura usando storeToRefs
  const { data, isLoading } = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60, // un hora
    }
  )

  return {
    isLoading,
    data,

    //Getters
    selectedLabels: computed(() => issuesStore.labels),
    //Methods
    toggleLabel: issuesStore.toggleLabel,
  }
}


export default useLabels