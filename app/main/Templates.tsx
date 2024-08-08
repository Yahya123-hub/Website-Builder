'use client'
import React, { useEffect, useState } from 'react'
import { LayoutTemplateIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

// Define a type for your template
interface Template {
  id: string
  name: string
}

const TemplateBucketTab = () => {
  // Use the Template type for state
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // Add logic to fetch or initialize templates here
  }, [])

  const handlestore = () => {
    // Define the functionality for storing templates
    console.log('Store button clicked');
  }


  return (
    <div className="h-[900px] overflow-scroll p-4">
      <div className="flex flex-col gap-4 h-full w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Templates</h1>
          <Button onClick={handlestore}>Store</Button>
        </div>
        <Command className="bg-transparent">
          <CommandInput placeholder="Search for template" />
          <CommandList className="pb-40 max-h-full">
            <CommandEmpty>No Templates</CommandEmpty>
            <CommandGroup heading="Stored Templates">
              <div className="flex flex-wrap gap-4 pt-4">
                {templates.length === 0 ? (
                  <div className="flex items-center justify-center w-full flex-col">
                    <LayoutTemplateIcon size={150} className="text-muted-foreground" />
                    <p className="text-muted-foreground">No templates saved.</p>
                  </div>
                ) : (
                  templates.map((template) => (
                    <CommandItem key={template.id}>
                      <span>{template.name}</span>
                    </CommandItem>
                  ))
                )}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  )
}

export default TemplateBucketTab
