import { useDispatch } from 'react-redux'
import ActionCreators from '../Redux/ActionCreators'
import { bindActionCreators } from 'redux'

const useAppActions = () => {
    const dispacth = useDispatch()

    return bindActionCreators(ActionCreators, dispacth)
}

export {
    useAppActions
}