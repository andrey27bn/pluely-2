import { Badge, Input, Card, Empty, Button } from '@/components'
import { useHistory } from '@/hooks'
import { PageLayout } from '@/layouts'
import { MessageCircleIcon, Search, Trash2 } from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteAllConversations } from '@/lib/database/chat-history.action'
import { DeleteAllConfirmationDialog } from './components/DeleteAllConfirmation'

const Dashboard = () => {
	const conversations = useHistory()
	const navigate = useNavigate()

	// State для подтверждения удаления всех
	const [deleteAllConfirm, setDeleteAllConfirm] = useState(false)

	// Группируем беседы по дате
	const groupedConversations = conversations.conversations.reduce(
		(acc, doc) => {
			const dateKey = moment(doc.updatedAt).format('YYYY-MM-DD')
			if (!acc[dateKey]) {
				acc[dateKey] = []
			}
			acc[dateKey].push(doc)
			return acc
		},
		{} as Record<string, (typeof conversations.conversations)[number][]>
	)

	// Сортировка дат по убыванию (новые сверху)
	const sortedDates = Object.keys(groupedConversations).sort((a, b) =>
		moment(b).diff(moment(a))
	)

	const handleDeleteAllConfirm = () => setDeleteAllConfirm(true)

	const confirmDeleteAll = async () => {
		try {
			await deleteAllConversations()
			conversations.refreshConversations()
			setDeleteAllConfirm(false)
		} catch (error) {
			console.error('Failed to delete all conversations:', error)
			setDeleteAllConfirm(false)
		}
	}

	const cancelDeleteAll = () => setDeleteAllConfirm(false)

	return (
		<PageLayout
			title='All conversations'
			description='View all your conversations'
		>
			<>
				{/* Диалог подтверждения удаления всех */}
				<DeleteAllConfirmationDialog
					deleteAllConfirm={deleteAllConfirm}
					cancelDeleteAll={cancelDeleteAll}
					confirmDeleteAll={confirmDeleteAll}
				/>

				{conversations.conversations.length === 0 ? (
					<Empty
						isLoading={conversations.isLoading}
						icon={MessageCircleIcon}
						title='No conversations found'
						description='Start a new conversation to get started'
					/>
				) : (
					<div className='flex flex-col gap-6 pb-8'>
						<div className='flex items-center gap-3 mb-4'>
							<div className='relative w-1/3'>
								<Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									type='text'
									placeholder='Search conversations...'
									className='pl-9 focus-visible:ring-0 focus-visible:ring-offset-0'
									value={conversations.search}
									onChange={e => conversations.setSearch(e.target.value)}
								/>
							</div>
							<Button
								variant='outline'
								size='sm'
								onClick={handleDeleteAllConfirm}
								className='flex items-center gap-2'
								disabled={conversations.conversations.length === 0}
							>
								<Trash2 className='size-4' />
								Delete All
							</Button>
						</div>

						{sortedDates
							.filter(dateKey =>
								conversations.search?.length === 0
									? true
									: groupedConversations[dateKey]?.some(doc =>
											doc.title
												?.toLowerCase()
												.includes(conversations.search.toLowerCase())
									  )
							)
							.map(dateKey => (
								<div key={dateKey} className='flex flex-col gap-3'>
									<p className='text-xs text-muted-foreground select-none font-medium'>
										{moment(dateKey).format('ddd, MMM D')}
									</p>
									<div className='grid grid-cols-1 gap-3'>
										{groupedConversations[dateKey].map(doc => (
											<Card
												key={doc.id}
												className='shadow-none select-none p-4 gap-0 group relative transition-all !bg-black/5 dark:!bg-white/5 hover:!border-primary/50 cursor-pointer'
												onClick={() => navigate(`/chats/view/${doc.id}`)}
											>
												<div className='flex items-center justify-between'>
													<p className='line-clamp-1 text-sm mr-8'>
														{doc.title}
													</p>
													<div className='flex items-center gap-1'>
														<Badge variant='outline' className='text-xs'>
															{doc.messages.length} messages
														</Badge>
														<Badge variant='outline' className='text-xs'>
															{moment(doc.updatedAt).format('hh:mm A')}
														</Badge>
													</div>
												</div>
											</Card>
										))}
									</div>
								</div>
							))}
					</div>
				)}
			</>
		</PageLayout>
	)
}

export default Dashboard
