import { useEffect, useState } from 'react'
import { apiEnvironment, endpointFor, fetchResource } from '../api.js'

function formatValue(value) {
  if (value === undefined || value === null || value === '') {
    return 'Not set'
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'None'
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value.displayName ?? value.email ?? JSON.stringify(value)
  }

  return String(value)
}

function fieldValue(item, field) {
  if (typeof field.accessor === 'function') {
    return field.accessor(item)
  }

  return item[field.key]
}

function ResourcePage({ description, emptyMessage, fields, resource, title }) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCurrent = true

    async function loadResource() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchResource(resource)

        if (isCurrent) {
          setItems(result.items)
          setPagination(result.pagination)
        }
      } catch (requestError) {
        if (isCurrent) {
          setError(requestError.message)
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadResource()

    return () => {
      isCurrent = false
    }
  }, [resource])

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="api-pill">
          {apiEnvironment}: {endpointFor(resource)}
        </div>
      </div>

      {isLoading && <div className="status-panel">Loading {title.toLowerCase()}...</div>}

      {error && <div className="status-panel error">Unable to load {title.toLowerCase()}: {error}</div>}

      {!isLoading && !error && items.length === 0 && (
        <div className="status-panel">{emptyMessage}</div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="resource-grid">
          {items.map((item, index) => (
            <article className="resource-card" key={item._id ?? item.id ?? index}>
              <h3>{formatValue(item.name ?? item.title ?? item.username ?? `Record ${index + 1}`)}</h3>
              <dl>
                {fields.map((field) => (
                  <div key={field.label}>
                    <dt>{field.label}</dt>
                    <dd>{formatValue(fieldValue(item, field))}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      )}

      {pagination && (pagination.page || pagination.pages || pagination.count !== items.length) && (
        <p className="pagination-note">
          Showing {items.length} of {pagination.count} records
          {pagination.page && `, page ${pagination.page}`}
          {pagination.pages && ` of ${pagination.pages}`}
        </p>
      )}
    </section>
  )
}

export default ResourcePage