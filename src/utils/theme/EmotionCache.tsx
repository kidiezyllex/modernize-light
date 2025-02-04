"use client"

import * as React from "react"
import createCache from "@emotion/cache"
import { useServerInsertedHTML } from "next/navigation"
import { CacheProvider as DefaultCacheProvider } from "@emotion/react"
import type { EmotionCache, Options as OptionsOfCreateCache } from "@emotion/cache"

export type NextAppDirEmotionCacheProviderProps = {
  options: Omit<OptionsOfCreateCache, "insertionPoint">
  CacheProvider?: (props: {
    value: EmotionCache
    children: React.ReactNode
  }) => React.JSX.Element | null
  children: React.ReactNode
}

export function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props

  const [{ cache, flush }] = React.useState(() => {
    const emotionCache = createCache(options)
    emotionCache.compat = true
    const prevInsert = emotionCache.insert
    let inserted: string[] = []
    emotionCache.insert = (...args) => {
      const serialized = args[1]
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flushEmotion = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache: emotionCache, flush: flushEmotion }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ""
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}

