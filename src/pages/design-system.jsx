import "./design-system.css"

const DesignSystemPage = () => {
  return (
    <div className="design-system-container">
      <div className="page-header">
        <h1>디자인 시스템 가이드</h1>
        <p className="section-description">Find hiddenMaster 프로젝트에서 사용하는 CSS 변수 및 스타일 가이드</p>
      </div>

      {/* 목차 */}
      <div className="toc">
        <h3 className="toc-title">📋 목차</h3>
        <ul className="toc-list">
          <li className="toc-item"><a href="#colors">색상</a></li>
          <li className="toc-item"><a href="#typography">타이포그래피</a></li>
          <li className="toc-item"><a href="#spacing">간격</a></li>
          <li className="toc-item"><a href="#borders">보더 & 그림자</a></li>
          <li className="toc-item"><a href="#transitions">트랜지션</a></li>
          <li className="toc-item"><a href="#layout">레이아웃</a></li>
          <li className="toc-item"><a href="#components">컴포넌트</a></li>
        </ul>
      </div>

      {/* 색상 */}
      <section id="colors" className="section">
        <div className="section-header">
          <h2 className="section-title">색상 (Colors)</h2>
          <p className="section-description">프로젝트 전반에서 사용하는 색상 팔레트입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">Primary 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--primary-color</div>
              <div className="variable-value">#ff6b6b</div>
              <div className="variable-description">주요 액션 버튼, 강조 요소에 사용</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--primary-color)' }}>Primary</div>
                <div className="code-block">
                  <span className="property">background-color:</span> <span className="value">var(--primary-color)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--primary-dark</div>
              <div className="variable-value">#ee5a6f</div>
              <div className="variable-description">호버 상태, 더 진한 강조에 사용</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--primary-dark)' }}>Primary Dark</div>
                <div className="code-block">
                  <span className="property">background-color:</span> <span className="value">var(--primary-dark)</span>; <span className="comment">/* hover 상태 */</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--primary-light</div>
              <div className="variable-value">#ff8e8e</div>
              <div className="variable-description">연한 배경, 부드러운 강조에 사용</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--primary-light)' }}>Primary Light</div>
                <div className="code-block">
                  <span className="property">background-color:</span> <span className="value">var(--primary-light)</span>;
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">Secondary 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--secondary-color</div>
              <div className="variable-value">#4ecdc4</div>
              <div className="variable-description">보조 액션 버튼에 사용</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-color)' }}>Secondary</div>
                <div className="code-block">
                  <span className="property">background-color:</span> <span className="value">var(--secondary-color)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--secondary-dark</div>
              <div className="variable-value">#3bb5b0</div>
              <div className="variable-description">Secondary 호버 상태</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-dark)' }}>Secondary Dark</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--secondary-light</div>
              <div className="variable-value">#6eddd6</div>
              <div className="variable-description">Secondary 연한 배경</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--secondary-light)' }}>Secondary Light</div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">Accent 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--accent-color</div>
              <div className="variable-value">#ffe66d</div>
              <div className="variable-description">특별한 강조, 하이라이트에 사용</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--accent-color)' }}>Accent</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--accent-dark</div>
              <div className="variable-value">#ffd93d</div>
              <div className="variable-description">Accent 호버 상태</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--accent-dark)' }}>Accent Dark</div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">배경 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--background-color</div>
              <div className="variable-value">#ffffff</div>
              <div className="variable-description">기본 배경색 (화이트)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--background-color)', border: '2px solid var(--border-color)' }}>Background</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--background-light</div>
              <div className="variable-value">#f8f9fa</div>
              <div className="variable-description">연한 배경 (섹션 구분)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--background-light)', border: '2px solid var(--border-color)' }}>Background Light</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--background-dark</div>
              <div className="variable-value">#e9ecef</div>
              <div className="variable-description">더 진한 배경 (강조 섹션)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--background-dark)', border: '2px solid var(--border-color)' }}>Background Dark</div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">텍스트 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--text-primary</div>
              <div className="variable-value">#2d3436</div>
              <div className="variable-description">기본 텍스트 색상</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', color: 'var(--text-primary)' }}>
                  이 텍스트는 --text-primary를 사용합니다.
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--text-secondary</div>
              <div className="variable-value">#636e72</div>
              <div className="variable-description">보조 텍스트 색상</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', color: 'var(--text-secondary)' }}>
                  이 텍스트는 --text-secondary를 사용합니다.
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--text-muted</div>
              <div className="variable-value">#b2bec3</div>
              <div className="variable-description">비활성/약한 텍스트 색상</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', color: 'var(--text-muted)' }}>
                  이 텍스트는 --text-muted를 사용합니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">보더 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--border-color</div>
              <div className="variable-value">#dfe6e9</div>
              <div className="variable-description">기본 보더 색상</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ padding: 'var(--spacing-md)', border: '2px solid var(--border-color)', borderRadius: 'var(--border-radius-md)' }}>
                  보더 예시
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--border-light</div>
              <div className="variable-value">#f1f2f6</div>
              <div className="variable-description">연한 보더 색상</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ padding: 'var(--spacing-md)', border: '2px solid var(--border-light)', borderRadius: 'var(--border-radius-md)' }}>
                  연한 보더 예시
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">상태 색상</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--success-color</div>
              <div className="variable-value">#00b894</div>
              <div className="variable-description">성공 메시지, 확인</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--success-color)' }}>Success</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--error-color</div>
              <div className="variable-value">#d63031</div>
              <div className="variable-description">에러 메시지, 경고</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--error-color)' }}>Error</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--warning-color</div>
              <div className="variable-value">#fdcb6e</div>
              <div className="variable-description">경고 메시지</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch light" style={{ backgroundColor: 'var(--warning-color)' }}>Warning</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--info-color</div>
              <div className="variable-value">#0984e3</div>
              <div className="variable-description">정보 메시지</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="color-swatch" style={{ backgroundColor: 'var(--info-color)' }}>Info</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 타이포그래피 */}
      <section id="typography" className="section">
        <div className="section-header">
          <h2 className="section-title">타이포그래피 (Typography)</h2>
          <p className="section-description">텍스트 스타일 및 폰트 설정입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">폰트 패밀리</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--font-family-base</div>
              <div className="variable-value">-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...</div>
              <div className="variable-description">기본 폰트 (본문)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontFamily: 'var(--font-family-base)' }}>
                  기본 폰트 패밀리 예시<br />
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="code-block">
                  <span className="property">font-family:</span> <span className="value">var(--font-family-base)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-family-heading</div>
              <div className="variable-value">'Pretendard', -apple-system, BlinkMacSystemFont, ...</div>
              <div className="variable-description">제목 폰트 (h1-h6)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontFamily: 'var(--font-family-heading)', fontWeight: 'var(--font-weight-bold)' }}>
                  제목 폰트 패밀리 예시<br />
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">폰트 사이즈</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--font-size-xs</div>
              <div className="variable-value">0.75rem (12px)</div>
              <div className="variable-description">아주 작은 텍스트 (뱃지, 레이블)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-xs)' }}>XS 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-sm</div>
              <div className="variable-value">0.875rem (14px)</div>
              <div className="variable-description">작은 텍스트 (보조 정보)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-sm)' }}>SM 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-base</div>
              <div className="variable-value">1rem (16px)</div>
              <div className="variable-description">기본 텍스트 크기</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-base)' }}>Base 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-lg</div>
              <div className="variable-value">1.125rem (18px)</div>
              <div className="variable-description">큰 텍스트 (강조)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-lg)' }}>LG 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-xl</div>
              <div className="variable-value">1.25rem (20px)</div>
              <div className="variable-description">더 큰 텍스트</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-xl)' }}>XL 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-2xl</div>
              <div className="variable-value">1.5rem (24px)</div>
              <div className="variable-description">큰 제목 (h3)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>2XL 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-3xl</div>
              <div className="variable-value">1.875rem (30px)</div>
              <div className="variable-description">더 큰 제목 (h2)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)' }}>3XL 크기 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-size-4xl</div>
              <div className="variable-value">2.25rem (36px)</div>
              <div className="variable-description">최대 제목 (h1)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="font-size-example" style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>4XL 크기 텍스트</div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">폰트 굵기</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--font-weight-normal</div>
              <div className="variable-value">400</div>
              <div className="variable-description">일반 굵기</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontWeight: 'var(--font-weight-normal)' }}>Normal (400) 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-weight-medium</div>
              <div className="variable-value">500</div>
              <div className="variable-description">중간 굵기</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontWeight: 'var(--font-weight-medium)' }}>Medium (500) 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-weight-semibold</div>
              <div className="variable-value">600</div>
              <div className="variable-description">세미볼드</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontWeight: 'var(--font-weight-semibold)' }}>Semibold (600) 텍스트</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--font-weight-bold</div>
              <div className="variable-value">700</div>
              <div className="variable-description">볼드 (제목)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ fontWeight: 'var(--font-weight-bold)' }}>Bold (700) 텍스트</div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">줄 간격</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--line-height-tight</div>
              <div className="variable-value">1.25</div>
              <div className="variable-description">좁은 줄 간격 (제목)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ lineHeight: 'var(--line-height-tight)' }}>
                  Tight 줄 간격 예시<br />
                  두 번째 줄입니다.
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--line-height-normal</div>
              <div className="variable-value">1.5</div>
              <div className="variable-description">기본 줄 간격 (본문)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ lineHeight: 'var(--line-height-normal)' }}>
                  Normal 줄 간격 예시<br />
                  두 번째 줄입니다.
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--line-height-relaxed</div>
              <div className="variable-value">1.75</div>
              <div className="variable-description">넓은 줄 간격 (긴 본문)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="typography-example" style={{ lineHeight: 'var(--line-height-relaxed)' }}>
                  Relaxed 줄 간격 예시<br />
                  두 번째 줄입니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 간격 */}
      <section id="spacing" className="section">
        <div className="section-header">
          <h2 className="section-title">간격 (Spacing)</h2>
          <p className="section-description">여백 및 패딩에 사용하는 간격 단위입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">간격 단위</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--spacing-xs</div>
              <div className="variable-value">0.25rem (4px)</div>
              <div className="variable-description">아주 작은 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-xs)', height: 'var(--spacing-xs)', minWidth: '20px' }}>XS</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>4px</span>
                </div>
                <div className="code-block">
                  <span className="property">padding:</span> <span className="value">var(--spacing-xs)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-sm</div>
              <div className="variable-value">0.5rem (8px)</div>
              <div className="variable-description">작은 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-sm)', height: 'var(--spacing-sm)', minWidth: '30px' }}>SM</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>8px</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-md</div>
              <div className="variable-value">1rem (16px)</div>
              <div className="variable-description">기본 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-md)', height: 'var(--spacing-md)', minWidth: '40px' }}>MD</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>16px</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-lg</div>
              <div className="variable-value">1.5rem (24px)</div>
              <div className="variable-description">큰 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-lg)', height: 'var(--spacing-lg)', minWidth: '50px' }}>LG</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>24px</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-xl</div>
              <div className="variable-value">2rem (32px)</div>
              <div className="variable-description">더 큰 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-xl)', height: 'var(--spacing-xl)', minWidth: '60px' }}>XL</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>32px</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-2xl</div>
              <div className="variable-value">3rem (48px)</div>
              <div className="variable-description">아주 큰 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-2xl)', height: 'var(--spacing-2xl)', minWidth: '80px' }}>2XL</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>48px</span>
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--spacing-3xl</div>
              <div className="variable-value">4rem (64px)</div>
              <div className="variable-description">최대 간격</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="spacing-example">
                  <div className="spacing-visual" style={{ width: 'var(--spacing-3xl)', height: 'var(--spacing-3xl)', minWidth: '100px' }}>3XL</div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>64px</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 보더 & 그림자 */}
      <section id="borders" className="section">
        <div className="section-header">
          <h2 className="section-title">보더 & 그림자 (Borders & Shadows)</h2>
          <p className="section-description">보더 반경 및 그림자 효과입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">보더 반경</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--border-radius-sm</div>
              <div className="variable-value">0.25rem (4px)</div>
              <div className="variable-description">작은 모서리</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="border-radius-example" style={{ borderRadius: 'var(--border-radius-sm)' }}></div>
                <div className="code-block">
                  <span className="property">border-radius:</span> <span className="value">var(--border-radius-sm)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--border-radius-md</div>
              <div className="variable-value">0.5rem (8px)</div>
              <div className="variable-description">기본 모서리 (버튼, 입력 필드)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="border-radius-example" style={{ borderRadius: 'var(--border-radius-md)' }}></div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--border-radius-lg</div>
              <div className="variable-value">0.75rem (12px)</div>
              <div className="variable-description">큰 모서리 (카드)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="border-radius-example" style={{ borderRadius: 'var(--border-radius-lg)' }}></div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--border-radius-xl</div>
              <div className="variable-value">1rem (16px)</div>
              <div className="variable-description">더 큰 모서리</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="border-radius-example" style={{ borderRadius: 'var(--border-radius-xl)' }}></div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--border-radius-full</div>
              <div className="variable-value">9999px</div>
              <div className="variable-description">완전한 둥근 모서리 (원형, 뱃지)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="border-radius-example" style={{ borderRadius: 'var(--border-radius-full)' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">그림자</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--shadow-sm</div>
              <div className="variable-value">0 1px 2px 0 rgba(0, 0, 0, 0.05)</div>
              <div className="variable-description">작은 그림자 (약한 입체감)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="shadow-example" style={{ boxShadow: 'var(--shadow-sm)' }}>SM Shadow</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--shadow-md</div>
              <div className="variable-value">0 4px 6px -1px rgba(0, 0, 0, 0.1), ...</div>
              <div className="variable-description">기본 그림자 (카드, 버튼 호버)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="shadow-example" style={{ boxShadow: 'var(--shadow-md)' }}>MD Shadow</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--shadow-lg</div>
              <div className="variable-value">0 10px 15px -3px rgba(0, 0, 0, 0.1), ...</div>
              <div className="variable-description">큰 그림자 (모달, 드롭다운)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="shadow-example" style={{ boxShadow: 'var(--shadow-lg)' }}>LG Shadow</div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--shadow-xl</div>
              <div className="variable-value">0 20px 25px -5px rgba(0, 0, 0, 0.1), ...</div>
              <div className="variable-description">최대 그림자 (중요한 모달)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div className="shadow-example" style={{ boxShadow: 'var(--shadow-xl)' }}>XL Shadow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 트렌지션 */}
      <section id="transitions" className="section">
        <div className="section-header">
          <h2 className="section-title">트랜지션 (Transitions)</h2>
          <p className="section-description">애니메이션 효과에 사용하는 트랜지션 시간입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">트랜지션 속도</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--transition-fast</div>
              <div className="variable-value">150ms ease-in-out</div>
              <div className="variable-description">빠른 트랜지션 (호버, 포커스)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <button
                  style={{ padding: 'var(--spacing-sm) var(--spacing-md)', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  호버해보세요 (Fast)
                </button>
                <div className="code-block">
                  <span className="property">transition:</span> <span className="value">all var(--transition-fast)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--transition-base</div>
              <div className="variable-value">250ms ease-in-out</div>
              <div className="variable-description">기본 트랜지션 (버튼, 카드)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <button
                  style={{ padding: 'var(--spacing-sm) var(--spacing-md)', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', transition: 'all var(--transition-base)' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  호버해보세요 (Base)
                </button>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--transition-slow</div>
              <div className="variable-value">350ms ease-in-out</div>
              <div className="variable-description">느린 트랜지션 (페이지 전환)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <button
                  style={{ padding: 'var(--spacing-sm) var(--spacing-md)', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--border-radius-md)', cursor: 'pointer', transition: 'all var(--transition-slow)' }}
                  onMouseOver={(e) => { e.currentTarget.style.opacity = '0.8' }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  호버해보세요 (Slow)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 레이아웃 */}
      <section id="layout" className="section">
        <div className="section-header">
          <h2 className="section-title">레이아웃 (Layout)</h2>
          <p className="section-description">레이아웃 관련 크기 설정입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">레이아웃 크기</h3>
          <div className="variable-grid">
            <div className="variable-item">
              <div className="variable-name">--max-width-container</div>
              <div className="variable-value">1200px</div>
              <div className="variable-description">컨테이너 최대 너비</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ maxWidth: 'var(--max-width-container)', padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', margin: '0 auto' }}>
                  컨테이너 예시 (max-width: 1200px)
                </div>
                <div className="code-block">
                  <span className="property">max-width:</span> <span className="value">var(--max-width-container)</span>;
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--max-width-content</div>
              <div className="variable-value">800px</div>
              <div className="variable-description">콘텐츠 최대 너비 (폼, 단일 컬럼)</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ maxWidth: 'var(--max-width-content)', padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', margin: '0 auto' }}>
                  콘텐츠 예시 (max-width: 800px)
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--header-height</div>
              <div className="variable-value">64px</div>
              <div className="variable-description">헤더/네비게이션 높이</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ height: 'var(--header-height)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                  Header Height: 64px
                </div>
              </div>
            </div>
            <div className="variable-item">
              <div className="variable-name">--sidebar-width</div>
              <div className="variable-value">280px</div>
              <div className="variable-description">사이드바 너비</div>
              <div className="variable-example">
                <div className="example-label">예시</div>
                <div style={{ width: 'var(--sidebar-width)', padding: 'var(--spacing-md)', backgroundColor: 'var(--background-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                  Sidebar Width: 280px
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 컴포넌트 예시 */}
      <section id="components" className="section">
        <div className="section-header">
          <h2 className="section-title">컴포넌트 사용 예시</h2>
          <p className="section-description">일반적인 컴포넌트에서 CSS 변수를 사용하는 방법입니다.</p>
        </div>

        <div className="variable-category">
          <h3 className="category-title">버튼 예시</h3>
          <div className="variable-item">
            <div className="variable-description">공통 CSS 클래스를 사용한 버튼 예시</div>
            <div className="variable-example">
              <div className="example-label">예시</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                <button className="btn btn-primary">Primary 버튼</button>
                <button className="btn btn-secondary">Secondary 버튼</button>
                <button className="btn btn-outline">Outline 버튼</button>
                <button className="btn btn-primary btn-sm">Small 버튼</button>
                <button className="btn btn-primary btn-lg">Large 버튼</button>
              </div>
              <div className="code-block">
                <span className="keyword">&lt;button</span> <span className="property">class</span>=<span className="value">"btn btn-primary"</span><span className="keyword">&gt;</span>Primary 버튼<span className="keyword">&lt;/button&gt;</span>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">카드 예시</h3>
          <div className="variable-item">
            <div className="variable-description">카드 컴포넌트 예시</div>
            <div className="variable-example">
              <div className="example-label">예시</div>
              <div className="card" style={{ maxWidth: '300px', marginTop: 'var(--spacing-md)' }}>
                <div className="card-header">
                  <h4 className="card-title">카드 제목</h4>
                </div>
                <div className="card-body">
                  <p style={{ marginBottom: '0' }}>카드 본문 내용입니다. CSS 변수를 사용하여 스타일이 일관되게 적용됩니다.</p>
                </div>
              </div>
              <div className="code-block">
                <span className="keyword">&lt;div</span> <span className="property">class</span>=<span className="value">"card"</span><span className="keyword">&gt;</span>
                <span className="keyword">&lt;div</span> <span className="property">class</span>=<span className="value">"card-header"</span><span className="keyword">&gt;</span>...<span className="keyword">&lt;/div&gt;</span>
                <span className="keyword">&lt;div</span> <span className="property">class</span>=<span className="value">"card-body"</span><span className="keyword">&gt;</span>...<span className="keyword">&lt;/div&gt;</span>
                <span className="keyword">&lt;/div&gt;</span>
              </div>
            </div>
          </div>
        </div>

        <div className="variable-category">
          <h3 className="category-title">폼 요소 예시</h3>
          <div className="variable-item">
            <div className="variable-description">입력 필드 예시</div>
            <div className="variable-example">
              <div className="example-label">예시</div>
              <div style={{ maxWidth: '400px', marginTop: 'var(--spacing-md)' }}>
                <label className="form-label">이름</label>
                <input type="text" className="form-input" placeholder="이름을 입력하세요" />
                <label className="form-label" style={{ marginTop: 'var(--spacing-md)' }}>메시지</label>
                <textarea className="form-textarea" placeholder="메시지를 입력하세요" rows="3"></textarea>
              </div>
              <div className="code-block">
                <span className="keyword">&lt;label</span> <span className="property">class</span>=<span className="value">"form-label"</span><span className="keyword">&gt;</span>이름<span className="keyword">&lt;/label&gt;</span>
                <span className="keyword">&lt;input</span> <span className="property">type</span>=<span className="value">"text"</span> <span className="property">class</span>=<span className="value">"form-input"</span><span className="keyword">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DesignSystemPage