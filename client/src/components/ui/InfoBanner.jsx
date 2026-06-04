import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';
import './InfoBanner.css';

const icons = {
  info: FiInfo,
  success: FiCheckCircle,
  error: FiAlertCircle
};

const InfoBanner = ({
  variant = 'info',
  children,
  onDismiss,
  className = '',
  toast = true,
  autoHideMs = 3000
}) => {
  const Icon = icons[variant] || FiInfo;
  const role = variant === 'error' ? 'alert' : 'status';
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!toast || !autoHideMs || !onDismiss) return undefined;
    const id = window.setTimeout(() => {
      onDismissRef.current?.();
    }, autoHideMs);
    return () => clearTimeout(id);
  }, [toast, autoHideMs, onDismiss]);

  const classes = ['info', `info--${variant}`, toast ? 'info--toast' : 'info--inline', className]
    .filter(Boolean)
    .join(' ');

  const node = (
    <div className={classes} role={role}>
      <span className="info__icon-wrap" aria-hidden>
        <Icon size={20} strokeWidth={2.25} />
      </span>
      <p className="info__title">{children}</p>
      {onDismiss ? (
        <button
          type="button"
          className="info__close"
          onClick={onDismiss}
          aria-label="Fermer le message"
        >
          <FiX size={20} strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}
    </div>
  );

  if (toast && typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }

  return node;
};

export default InfoBanner;
