import {
	Label,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	Header,
} from '@/components'
import { UseSettingsReturn } from '@/types'
import { LaptopMinimalIcon, MousePointer2Icon } from 'lucide-react'

export const ScreenshotConfigs = ({
	screenshotConfiguration,
	handleScreenshotModeChange,
	handleScreenshotPromptChange,
	handleScreenshotEnabledChange,
	settings, // доступ к aiProvider
}: UseSettingsReturn) => {
	if (!screenshotConfiguration) return null

	const captureMode = screenshotConfiguration.enabled
		? 'screenshot'
		: 'selection'

	// Функция для захвата скриншота
	const captureScreenshot = (area?: DOMRect) => {
		// Если AI провайдер выбран, можно сразу анализировать
		if (settings?.aiProvider) {
			analyzeScreenshot(area)
		} else {
			// иначе просто сохраняем скриншот локально
			saveScreenshotLocally(area)
		}
	}

	return (
		<div id='screenshot' className='space-y-6'>
			{/* Capture Mode */}
			<div className='space-y-2'>
				<Header
					title='Capture Method'
					description={
						screenshotConfiguration.enabled
							? 'Screenshot Mode: Quickly capture the entire screen with one click.'
							: 'Selection Mode: Click and drag to select a specific area to capture.'
					}
				/>
				<Select
					value={captureMode}
					onValueChange={value =>
						handleScreenshotEnabledChange(value === 'screenshot')
					}
				>
					<SelectTrigger className='w-full h-11 border border-input/50 focus:border-primary/50 transition-colors'>
						<div className='flex items-center gap-2'>
							{captureMode === 'screenshot' ? (
								<LaptopMinimalIcon className='size-4' />
							) : (
								<MousePointer2Icon className='size-4' />
							)}
							<div className='text-sm font-medium'>
								{captureMode === 'screenshot'
									? 'Screenshot Mode'
									: 'Selection Mode'}
							</div>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='selection' className='flex items-center gap-2'>
							<MousePointer2Icon className='size-4' />
							<div className='font-medium'>Selection Mode</div>
						</SelectItem>
						<SelectItem value='screenshot' className='flex items-center gap-2'>
							<LaptopMinimalIcon className='size-4' />
							<div className='font-medium'>Screenshot Mode</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Processing Mode */}
			<div className='space-y-2'>
				<Header
					title='Processing Mode'
					description={
						screenshotConfiguration.mode === 'manual'
							? 'Screenshots will be captured and added to your files. You can then submit them manually.'
							: 'Screenshots will be automatically submitted to AI using your custom prompt, if a provider is selected.'
					}
				/>
				<Select
					value={screenshotConfiguration.mode}
					onValueChange={handleScreenshotModeChange}
				>
					<SelectTrigger className='w-full h-11 border border-input/50 focus:border-primary/50 transition-colors'>
						<div className='flex items-center gap-2'>
							<div className='text-sm font-medium'>
								{screenshotConfiguration.mode === 'auto' ? 'Auto' : 'Manual'}{' '}
								Mode
							</div>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='manual'>
							<div className='font-medium'>Manual Mode</div>
						</SelectItem>
						<SelectItem value='auto'>
							<div className='font-medium'>Auto Mode</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Auto Prompt Input */}
			{screenshotConfiguration.mode === 'auto' && (
				<div className='space-y-2'>
					<Label className='text-sm font-medium'>Auto Prompt</Label>
					<Input
						placeholder='Enter prompt for automatic screenshot analysis...'
						value={screenshotConfiguration.autoPrompt}
						onChange={e => handleScreenshotPromptChange(e.target.value)}
						className='w-full h-11 border border-input/50 focus:border-primary/50 transition-colors'
					/>
					<p className='text-xs text-muted-foreground'>
						This prompt will be used automatically when screenshots are taken
						only if an AI provider is selected.
					</p>
				</div>
			)}

			{/* Tips */}
			<div className='text-xs text-muted-foreground/70'>
				<p>
					💡 <strong>Tip:</strong>{' '}
					{captureMode === 'screenshot'
						? 'Screenshot mode captures the full screen with one click.'
						: 'Selection mode lets you choose specific areas to capture.'}{' '}
					Auto mode uses AI only if a provider is selected.
				</p>
			</div>
		</div>
	)
}

// Фейковые функции для примера
function analyzeScreenshot(area?: DOMRect) {
	console.log('Analyzing screenshot with AI...', area)
}

function saveScreenshotLocally(area?: DOMRect) {
	console.log('Screenshot saved locally', area)
}
