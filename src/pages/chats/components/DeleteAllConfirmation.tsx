import { Button } from '@/components'

interface DeleteAllConfirmationDialogProps {
	deleteAllConfirm: boolean
	cancelDeleteAll: () => void
	confirmDeleteAll: () => void
}

export const DeleteAllConfirmationDialog = ({
	deleteAllConfirm,
	cancelDeleteAll,
	confirmDeleteAll,
}: DeleteAllConfirmationDialogProps) => {
	if (!deleteAllConfirm) return null

	return (
		<div className='absolute inset-0 bg-black/50 flex items-center justify-center z-50'>
			<div className='bg-background border rounded-lg p-6 max-w-md mx-4'>
				<h3 className='text-lg font-semibold mb-2'>Delete All Conversations</h3>
				<p className='text-sm text-muted-foreground mb-4'>
					Are you sure you want to delete all conversations? This action cannot
					be undone and will permanently remove all your chat history.
				</p>
				<div className='flex justify-end gap-2'>
					<Button variant='outline' onClick={cancelDeleteAll}>
						Cancel
					</Button>
					<Button variant='destructive' onClick={confirmDeleteAll}>
						Delete All
					</Button>
				</div>
			</div>
		</div>
	)
}
