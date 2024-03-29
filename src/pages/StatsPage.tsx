import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Helmet } from "react-helmet-async";

import { HOME_URL } from "../constants/PAGE_URLS";

import appStore from "../store/appStore";

import * as logStoreHelper from "../helpers/logStoreHelper";

import EntryHeaderDisplay from "../components/EntryHeaderDisplay";

import combineClassnames from "../utilities/combineClassnames";

type Props = {
  className?: string;
};

export default observer(function StatsPage({ className }: Props) {
  if (!appStore.isReady) {
    return <Navigate to={HOME_URL} replace />;
  }

  const statsData = logStoreHelper.createStats();
  return (
    <div
      id="app-page-charts"
      className={combineClassnames("flex-col", className)}
    >
      <Helmet>
        <title>kolmafioso</title>
        <meta name="description" content="Mafioso stats page" />
      </Helmet>

      <div className="fontsize-7 f-bold talign-center">Stats</div>
      <div className="fontsize-3 talign-center">(wip)</div>

      {statsData.map((data) => (
        <StatDayBlock
          data={data}
          key={`stat-day-block-${data.dayNum}-key`}
          className="adjacent-mar-t-2"
        />
      ))}
    </div>
  );
});

type StatDayBlockProps = {
  className: string;
  data: logStoreHelper.Stats;
};

function StatDayBlock({ className, data }: StatDayBlockProps) {
  const { dayNum } = data;

  return (
    <div className={combineClassnames("flex-col", className)}>
      <EntryHeaderDisplay
        topContent={`Day ${dayNum}`}
        className="pad-3 adjacent-mar-t-1"
      />

      <StatRow label="Voter Monster" content={data.voterMonster} />
      <StatRow label="Painting Monster" content={data.paintingMonster} />
      <StatRow label="Cargo Pocket" content={data.cargoPocket} />
      <StatRow label="Lathe Item" content={data.latheChoice} />
      <StatRow label="Map the Monsters" content={data.mapTheMonsterList} />
    </div>
  );
}

type StatRowProps = {
  className?: string;
  label: string;
  content?: React.ReactNode;
};

function StatRow({ className, label, content }: StatRowProps) {
  if (content === undefined || content === null) {
    return null;
  }

  return (
    <div className={combineClassnames("flex-row adjacent-mar-t-2", className)}>
      <span className="adjacent-mar-l-3">{`${label}:`}</span>
      <span className="f-bold adjacent-mar-l-3">{content}</span>
    </div>
  );
}
