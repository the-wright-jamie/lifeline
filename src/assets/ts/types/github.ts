/**
 * A release as defined by the GitHub API.
 */
export type Release = {
  url: string
  html_url: string
  assets_url: string
  upload_url: string
  tarball_url: string | null
  zipball_url: string | null
  id: number
  node_id: string
  /**
   * The name of the tag.
   */
  tag_name: string
  /**
   * Specifies the commitish value that determines where the Git tag is created from.
   */
  target_commitish: string
  name: string | null
  body?: string | null
  /**
   * true is a draft (unpublished) release, false is a published one.
   */
  draft: boolean
  /**
   * Whether to identify the release as a prerelease or a full release.
   */
  prerelease: boolean
  created_at: string
  published_at: string | null
  author: GitHubUser
  assets: ReleaseAsset[]
  body_html?: string
  body_text?: string
  mentions_count?: number
  /**
   * The URL of the release discussion.
   */
  discussion_url?: string
  reactions?: ReactionRollup
  [k: string]: unknown
}

/**
 * A GitHub user as defined by the GitHub API.
 */
export interface GitHubUser {
  name?: string | null
  email?: string | null
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  starred_at?: string
  user_view_type?: string
  [k: string]: unknown
}

/**
 * Data related to a release as defined by the GitHub API.
 */
export interface ReleaseAsset {
  url: string
  browser_download_url: string
  id: number
  node_id: string
  /**
   * The file name of the asset.
   */
  name: string
  label: string | null
  /**
   * State of the release asset.
   */
  state: 'uploaded' | 'open'
  content_type: string
  size: number
  digest: string | null
  download_count: number
  created_at: string
  updated_at: string
  uploader: null | GitHubUser
  [k: string]: unknown
}

export interface ReactionRollup {
  url: string
  total_count: number
  '+1': number
  '-1': number
  laugh: number
  confused: number
  heart: number
  hooray: number
  eyes: number
  rocket: number
  [k: string]: unknown
}
