import { storeToRefs } from 'pinia'
import { useIssuesStore } from 'src/stores/issues'


//Segunda forma de implementar manejando el store desde un composable asi si cambiamos el store podemos hacerlo en un solo lugar.


const useStore = () => {
  const issuesStore = useIssuesStore()
  const { state, labels } = storeToRefs(issuesStore)


  return {
    // Reactive Properties
    state,
    labels

    //Getters(Computed)

    //Actions Methods
  }
}


export default useStore