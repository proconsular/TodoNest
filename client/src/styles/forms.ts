import { mergeStyleSets } from "@uifabric/merge-styles"

export const getFormStyles = () => {
    return mergeStyleSets({
        form: {
            display: 'flex',
            flexDirection: 'column',
            background: 'none !important',            
            selectors: {
                'input': {
                    color: '#fff',
                    fontSize: 24,
                    border: 'none',
                    background: 'none !important',
                    marginBottom: 4,
                    borderBottom: '1px solid #eeea',
                },
                'button': {
                    marginTop: 12,
                    fontSize: 24,
                    border: 'none',
                    background: '#e77',
                    color: '#fff',
                    borderRadius: 4,
                    padding: 4,
                }
            }
        }
    })
}