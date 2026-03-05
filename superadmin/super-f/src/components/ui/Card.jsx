const Card = ({ title, actions, children, className = '' }) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-md transition-all duration-200 hover:-translate-y-[2px] dark:border-white/10 dark:bg-[#0e2a33] dark:text-white dark:shadow-xl ${className}`}
    >
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          {title ? (
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          ) : (
            <span />
          )}
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      )}
      <div>{children}</div>
    </section>
  )
}

export default Card
